---
title: "My burner email blocklist blocked me"
description: "Blocking disposable email domains at signup increasingly punishes privacy-conscious users while doing little against motivated abusers."
pubDate: 2026-07-08
category: privacy
draft: false
---

A few days ago I tried to sign up for a public open-data service (_the [ECMWF](https://www.ecmwf.int), if you care_) using a Proton Mail alias, and the form rejected my address as "potential spam". My frustration was mixed with a bit of guilt: in 2018 I published [Burnex](https://github.com/Betree/burnex), an Elixir package that compared emails against a large list of known burner domains, temporary inboxes like _yopmail.fr_ that exist to receive a confirmation link and disappear. The library itself was relying on the fairly popular [wesbos/burner-email-providers](https://github.com/wesbos/burner-email-providers) list.

At the time, I was working on a collaborative fact-checking platform where account authenticity mattered, and we needed some confidence that users were not fake or batch-generated. A domain blocklist felt like a cheap heuristic for a broader trust problem.

I may be late to the party, but let me put it clearly: **I no longer recommend systematically blocking burner domains at signup.**

**TLDR;**

> If you are deciding signup policy today, do not automatically reject users for using privacy email services. Distinguish between public shared inboxes and personal aliases, and only block the former. The person behind an alias is more likely protecting themselves than trying to scam you, and the spammers have already moved on. If you maintain or consume a blocklist, consider splitting the categories and encourage good practices in your documentation.

## Burners and aliases are not the same thing

A distinction that we often forget when it comes to email blocklists: a classic _burner email_ is a **public**, short-lived inbox anyone can access, useful for clicking a verification link once and walking away. An _email alias_ is the opposite: a permanent forwarding address tied to _your_ account, that you control, can disable, and can trace back to a specific signup when your password appears in a breach.

Nowadays, tools like [Firefox Relay](https://relay.firefox.com/) and [Apple Hide My Email](https://support.apple.com/en-us/102648) are mainstream products, not edge-case hacker tools. Mozilla markets Relay as a way to keep your identity private when signing up for new accounts, and Apple sells Hide My Email as a way to share an address without sharing your real one (_though they may be [overselling](https://news.ycombinator.com/item?id=48744606) that promise_).

Blocklists that treat alias providers like throwaway inboxes end up blocking people who are trying to protect themselves. That matters beyond signup friction: aliases limit cross-site tracking, reduce spam after breaches, and let you know exactly which service leaked your address when junk mail starts arriving at a forwarding address you gave only to them. We should want more people using aliases, not fewer.

## Blocklists don't stop determined abusers

Determined abusers have never been limited to blocklisted domains. Gmail's `+` aliasing creates unlimited variations of the same inbox (`you+shop@gmail.com`, `you+news@gmail.com`), services like [Emailnator](https://www.emailnator.com/) can help you generate infinite variations of these throwaway Gmail addresses on demand. Custom domains cost a few dollars a year while looking indistinguishable from legitimate business email. Unlike your users, spammers have the means and the time to work around a domain blocklist. For them it is a small obstacle, not a wall.

Yes, blocklists still catch some low-effort automated signups. **But the cost is asymmetric: a naive bot gets slowed down slightly, while a real user with a legit alias gets hard-rejected with no recourse.** You are optimizing for the attacker who gives up easily and punishing the user who takes privacy seriously. The people blocklists were meant to stop were never really stopped; they just learned to use domains you trust.

Beyond blocklists, email verification in general (including confirmation links) should not be treated as proof that an account is real, unique, or trustworthy. It only proves that someone could receive an email at that address once.

## There are still valid uses

Checking whether an email domain appears on a known-disposable list is still a reasonable signal to feed into a broader trust or risk score, to surface suspicious patterns across a batch of signups, or to ignore them in your marketing campaigns.

If I were to rebuild Burnex today, I would narrow its scope to genuinely public and shared inboxes (addresses like _mailinator.com_ where anyone can receive your verification email) rather than conflating those with personal forwarding services that happen to use a non-mainstream domain:

```elixir
# Public burner inbox, probably ok to block
Burnex.is_burner?("random@yopmail.fr")

# Personal alias, usually not ok to block
Burnex.is_alias?("random@passmail.net")
```

But the problem is not just how one library categorizes domains: the upstream list Burnex relied on ([wesbos/burner-email-providers](https://github.com/wesbos/burner-email-providers)) is consumed as-is by signup validators, third-party packages, and APIs worldwide. Many integrators block every domain in `emails.txt` without curating it, so the list's categorization choices have real downstream effects.

## _For those who come after_

I have opened [an issue](https://github.com/wesbos/burner-email-providers/issues/538) to propose exactly that split in wesbos' list: keep one file for public shared inboxes (_yopmail.fr_, _mailinator.com_, and similar) and add a second for personal alias and forwarding providers (_passmail.net_, _anonaddy.me_, _mozmail.com_, and the rest). Then update the README with recommendations for good practices.

Due to a lack of time and because I don't use Burnex anymore in the products I maintain, I deprecated the project in early 2026. Since then, [Klemen Sever](https://github.com/achedeuzot) offered to take over the project, and I have transferred ownership.
