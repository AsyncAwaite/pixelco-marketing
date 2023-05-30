<?php

$token = "6087817417:AAGF3Gx-oPrz_MPDejJSY-Kc3ruhh5SLocA";

$chat_id = "-1001988168614";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $input = json_decode(file_get_contents("php://input"), true);


  if (isset($input['title'])) {
    if (!empty($input['title'])) {
      $title = strip_tags($input['title']);
      $titleFieldset = "";
    }
  }


  if (isset($input['name'])) {
    if (!empty($input['name'])) {
      $name = strip_tags($input['name']);
      $nameFieldset = "Ім'я: ";
    }
  }
    if (isset($input['email'])) {
        if (!empty($input['email'])) {
            $email = strip_tags($input['email']);
            $emailFieldset = "Email: ";
        }
    }


  if (isset($input['phone'])) {
    if (!empty($input['phone'])) {
      $phone = strip_tags($input['phone']);
      $phoneFieldset = "Телефон: ";
    }
  }

    $arr = array(
      $titleFieldset => $title . '%0A',
      $nameFieldset => $name,
      $phoneFieldset => $phone,
      $emailFieldset => $email,
    );
  




  foreach ($arr as $key => $value) {

    $txt .= "<b>" . $key . "</b> " . $value . "%0A";
  };
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
  // }
}
