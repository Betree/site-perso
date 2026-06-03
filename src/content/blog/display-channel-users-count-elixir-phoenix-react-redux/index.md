---
title: Display channel users count with Elixir/Phoenix + React/Redux
description: Implementing an anonymized and fast users count feature that can scale using Phoenix Presence.
pubDate: 2018-08-21
category: elixir
---

A few months ago, we decided to implement a users count feature on
[CaptainFact](https://captainfact.io)'s videos pages. It had to be reliable,
light and simple. We also wanted to differentiate between logged-in and anonymous users. 

![Banner](banner.png)

The most interesting read I had at the time on this subject was a
[medium article](https://medium.com/@pejrich/tracking-anonymous-unauthorized-users-with-elixir-phoenix-channels-and-presence-cfec1b93c1b0)
which has one major flaw: the **full** users list is returned from the backend and the count
occurs on the frontend (which actually respects the default behaviour of `Phoenix.Presence`).

Depending on your business, it can represent a privacy issue (you don't especially
want anyone to be able to know who's connected to your channel) as well as a performance
issue.

In the following article, I'll show you how I implemented `Phoenix.Presence` in such a way that
it only returns the total of connected / anonymous users. We'll then see how to bind it
to `Redux`.

## Backend

### Implementing `Phoenix.Presence`

The first thing you want is to implement your own tracker:

`lib/my_app_web/presence.ex`
```elixir
defmodule MyAppWeb.Presence do
  @moduledoc """
  Provides presence tracking to channels and processes.

  See the [`Phoenix.Presence`](http://hexdocs.pm/phoenix/Phoenix.Presence.html)
  docs for more details.
  """

  # Replace the values below with your app's values
  use Phoenix.Presence, otp_app: :my_app, pubsub_server: MyApp.PubSub
end
```

This implementation is enough if you want to return the classic users list (for 
example in a chat). In our case we want to override the default fetch to return
only the users count, and not the full users list:

```elixir
@doc """
Overrides the default fetch. Instead of returning the full users list,
we only return the count of open sockets.
This map is what will be returned to the frontend.
"""
def fetch(_topic, entries) do
  %{
    "viewers" => %{"count" => count_presences(entries, "viewers")},
    "users" => %{"count" => count_presences(entries, "users")}
  }
end

defp count_presences(entries, key) do
  case get_in(entries, [key, :metas]) do
    nil -> 0
    metas -> length(metas)
  end
end
```

## Binding the presence module

### Add your new module to your app's supervisor

`lib/my_app/application.ex`
```elixir
defmodule MyApp.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Presence to track number of connected users to a channel
      supervisor(CaptainFactWeb.Presence, []),
      ...
    ]
  end
end
```

### Plugging Presence on the channel

Last thing you need to do is to plug your new `Presence` module to your channel.
This part depends of how you've implemented channels authentication, in our case
we detect an authenticated channel by setting a `user_id` in the channel attributes.

Add the two following functions to the channel you want to track:

`lib/my_app_web/channels/my_channel.ex`
```elixir
@doc """
Register a public connection in presence tracker
"""
def handle_info(:after_join, socket = %{assigns: %{user_id: nil}}) do
  {:ok, _} = Presence.track(socket, :viewers, %{})
  push_presence_state(socket)
  {:noreply, socket}
end

@doc """
Register a user connection in presence tracker
"""
def handle_info(:after_join, socket = %{assigns: %{user_id: user_id}}) do
  {:ok, _} = Presence.track(socket, :users, %{user_id: user_id})
  push_presence_state(socket)
  {:noreply, socket}
end

defp push_presence_state(socket) do
  push(socket, "presence_state", Presence.list(socket))
end
```

Then call these in you `join/3` function when it succeeds:

```elixir
def join("my_channel", _payload, socket) do
  send(self(), :after_join)
  {:ok, %{}, socket}
end
```

And that's it for the backend !

## Frontend

We now need to plug the channel presence messages to update our frontend. This
example uses Redux, but you can easily transpose it for another store system.

`app/state/presence/reducer.js`
```javascript
import { handleActions, createAction } from 'redux-actions'
import { Record } from 'immutable'


export const setPresence = createAction('PRESENCE/SET')
export const presenceDiff = createAction('PRESENCE/DIFF')


const INITIAL_STATE = new Record({
  viewers: new Record({count: 0})(),
  users: new Record({count: 0})(),
})

const PresenceReducer = handleActions({
  [setPresence]: (state, {payload}) => state.merge(payload),
  [presenceDiff]: (state, {payload: {leaves, joins}}) => {
    return state.withMutations(record => record
      .updateIn(['viewers', 'count'], x => {
        return (x + joins.viewers.count) - leaves.viewers.count
      })
      .updateIn(['users', 'count'], x => {
        return (x + joins.users.count) - leaves.users.count
      })
    )
  }
}, INITIAL_STATE())

export default PresenceReducer
```

And the final binding on channel:

`app/state/my_channel/effects.js`
```javascript
import { Socket } from 'phoenix'
import { setPresence, presenceDiff } from '../my_channel/reducer'

/**
 * Effect to dispatch. Joins a channel 
 */
export const joinChannel = () => (dispatch) => {
  const socket = new Socket(SOCKET_URL)
  const channel = socket.channel("my_channel")
  channel.on('presence_state', presenceState => dispatch(setPresence(presenceState)))
  channel.on('presence_diff', diff => dispatch(presenceDiff(diff)))
  channel.join()
  return channel
}
```

And voilà! Add a component to render this stuff:

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = {presence: {nbUsers, nbViewers}} => ({nbUsers, nbViewers})

const Presence = ({nbUsers, nbViewers}) => (
  <div className="presence">
    <div type="primary">
      <span>{nbUsers} users</span>
    </div>
    <div className="viewers">
      <span>{nbViewers} viewers</span>
    </div>
  </div>
)

Presence.propTypes = {
  nbUsers: PropTypes.number.isRequired,
  nbViewers: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Presence)
```

And you'll end up with a nice anonimized and well-optimized counter:

![Final Counter](counter.png) 

--------------------

All CaptainFact's code is open-source (AGPL3). You can find the API code
on https://github.com/CaptainFact/captain-fact-api and the frontend code
on https://github.com/CaptainFact/captain-fact-frontend
