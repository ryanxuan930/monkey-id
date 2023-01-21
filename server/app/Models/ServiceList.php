<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceList extends Model
{
    use HasFactory;
    protected $table = "email_log";
    protected $primaryKey = "id";
    public $timestamps = false;
}
