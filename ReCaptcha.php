<?php
/**
 * User: piouffb
 * Date: 2/25/15
 * Time: 1:11 PM
 */

class ReCaptcha {
    const URL = 'https://www.google.com/recaptcha/api/siteverify';
    private static $secret = "6LeKjgITAAAAAFpsmAS6otl0umEBCXV8zdbOlvt5";

    function __construct() {
        $this::$secret = urlencode($this::$secret);
    }


    public function verify($userResponse, $userIp) {
        $fields_string = "secret=".$this::$secret."&response=".urlencode($userResponse)."&remoteip=".urlencode($userIp);
        $request = curl_init();

        curl_setopt($request,CURLOPT_URL, ReCaptcha::URL);
        curl_setopt($request,CURLOPT_POST, 3);
        curl_setopt($request,CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        $curlResponse = curl_exec($request);
        curl_close($request);
        if (result !== false && ($decodedJson = json_decode($curlResponse)) !== false) {
            if ($decodedJson->{"success"} === false) {
                return false;
            }
            return true;
        }
        error_log("Captcha seems down", 1, "piouffon@gmail.com");
        return false;
    }
}