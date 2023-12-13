<?php include('config.php')?>
<?php
$data = []
$errors = []

if (empty($_POST['name'])) {
    $errors['name'] = 'Name is required.';
}

if (empty($_POST['email'])) {
    $errors['email'] = 'Email is required.';
}

if (empty($_POST['subject'])) {
   $_POST['subject'] = $default_subject;
}

if (empty($_POST['message'])) {
    $errors['message'] = 'Message is required.';
}

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    $data['success'] = true;
    $data['message'] = 'Success!';
}

if ($data['success']) {
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $message = $_REQUEST['message'];
    $subject = $_REQUEST['subject'];

    $headers = "From:  ".$name." <".$email."> \r\n";
    $send_email = mail($to, $subject, $message, $headers);

    echo ($send_email) ? 'success' : 'error';
} else {
    echo $data['errors'];
}
