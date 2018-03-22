<?php

$name=$_POST['en-name'];
$email=$_POST['en-email'];
$mob=$_POST['en-phone']; 
$msg=$_POST['en-message'];

// $message=$_POST['message'];
require_once('php/PHPMailer-master/class.phpmailer.php');
$mail = new PHPMailer;

$mail->setFrom($email);
$mail->addAddress('admin@test.com');

$mail->Subject = 'Enquiry Form Details';
$mail->isHTML(true); 
$mail->Body = '<h2></h2><br/>
                    Contact Details
                      <table> 
                      	  <tr><td> Name : </td> <td> '.$name.' </td> </tr>
                          <tr><td> Email : </td> <td> '.$email.' </td> </tr>
						  <tr><td> Mobile : </td> <td> '.$mob.' </td> </tr>
					      <tr><td> Message: </td> <td> '.$msg.' </td> </tr>
				      </table><br/>';
if (!$mail->send()) {
    echo "Mail not send , Please try again";
}
  else
  { 
    echo '1';
  } 
?>