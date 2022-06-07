<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\evenchat;
class chatcontroller extends Controller
{
    public function index(){
        $messages = Message::all();
        return view('messages',compact('messages'));
    }


    public function postSendMessage(Request $request){
        $messages = Message::create($request->all());
        event(new evenchat($messages));
        return redirect()->back();
    }
}
