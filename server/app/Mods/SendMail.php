<?php

namespace App\Mods;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable{

    use Queueable, SerializesModels;

    public $sender;
    public $subject;
    public $variables;
    public $template; // in "view" file

    public function __construct(string $senderName, string $subject, string $templateName, $variables){
        $this->sender = $senderName;
        $this->subject = $subject;
        $this->template = $templateName;
        $this->variables = $variables;
    }

    public function build(){
        return $this->from(env('MAIL_FROM_ADDRESS', 'nsysuathletics@gmail.com'), $this->sender)->subject($this->subject)->view('mail/'.$this->template);
    }
}
