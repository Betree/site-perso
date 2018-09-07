/**
 * Dumb email decryptor to avoid robots
 */
export default (email) => {
  return atob(email).split("").reverse().join("")
}
