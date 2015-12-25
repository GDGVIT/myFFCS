<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeTableSlot extends Model
{
	protected $table = 'time_slots';
    protected $fillable = [
        'name', 'start', 'end', 'day', 'htmlid'
    ];

    public function usertimeslots(){
    	return $this->belongsToMany('App\userTimeSlot');
    }
}
