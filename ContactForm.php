<?php
require_once("./ReCaptcha.php");

class ContactForm {
    public static $postFields = [
        "captcha" => "g-recaptcha-response",
        "email" => "email",
        "message" => "message"
    ];

    private static $mailTo = "benjamin.piouffle@gmail.com";

    public function computeForm() {
        foreach ($this::$postFields as $field => $value) {
            if (array_key_exists($value, $_POST) === false) {
                return "Bad request - missing $field";
            } else if (strlen($_POST[$value]) === 0) {
                return "$field is empty";
            }
        }
        $verifier = new ReCaptcha;
        if ($verifier->verify($_POST["g-recaptcha-response"], $_SERVER['REMOTE_ADDR']) !== true) {
            return "Invalid captcha";
        }
        return $this->sendMail() === true ? true : "Mail cannot be send, please try again in few minutes.";
    }

    public function getFieldValueIfItExist($field) {
        if (array_key_exists($field, ContactForm::$postFields)) {
            return $_POST[ContactForm::$postFields[$field]];
        }
        return "";
    }

    private function sendMail() {
        $subject = '[benjaminpiouffle.com] New message from '.$_POST[ContactForm::$postFields["email"]];
        $message = $_POST[ContactForm::$postFields["message"]];
        $headers =  'From: noreply@benjaminpiouffle.com' . "\r\n" .
            'Reply-To: benjamin.piouffle@gmail.com' . "\r\n";

        return mail($this::$mailTo, $subject, $message, $headers);
    }
}
?>