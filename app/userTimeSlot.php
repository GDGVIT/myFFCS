<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class userTimeSlot extends Model
{
	public $timestamps = false;
	protected $table = 'time_table';
    protected $fillable = [
        'userid', 'credits', 'slotid', 'courseCode', 'nameofthecourse'
    ];

    public function user(){
    	return $this->belongsTo('App\User', 'userid', 'id');
    }

    public function timeslots(){
    	return $this->hasMany('App\TimeTableSlot', 'name', 'slotid');
    }
}
