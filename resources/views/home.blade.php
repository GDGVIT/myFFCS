<!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>FFCS Time Table Generator</title>
        <meta name="description" content="FFCS Time Table Generator" />
        <meta name="keywords" content="FFCS time table generator" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico">
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/component.css" />
        <style type="text/css">
        .action-button
{
    position: relative;
    padding: 10px 20px;
  margin: 0px 10px 10px 0px;
  float: left;
    border-radius: 6px;
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    color: #FFF;
    text-decoration: none;  
    
}
<<<<<<< HEAD
=======

>>>>>>> origin/master
.blue
{
    background-color: #3498DB;
    border-bottom: 5px solid #2980B9;
    text-shadow: 0px -2px #2980B9;
}
.animate
{
    transition: all 0.1s;
    -webkit-transition: all 0.1s;
}
        </style>

        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="container">
            <!-- Top Navigation -->
            <div class="codrops-top clearfix">
                <a class="codrops-icon" href="#"><span>Made With love by <b>Ashwini Purohit</b></span></a>
                <span class="right"><a class="codrops-icon codrops-icon-drop" href="#"><span>FFCS TIME TABLE GENERATOR</span></a></span>
            </div>
            <header>
                <h1>FFCS <em>Time Table</em> GENERATOR <span>Create your own Time Table according to your slots</span></h1> 
                <!--
                <nav class="codrops-demos">
                    <a href="index.html" title="Basic Usage">Basic Usage</a>
                    <a href="index2.html" title="Biaxial Headers">Biaxial Headers</a>
                    <a class="current-demo" href="index3.html" title="Wide Tables">Wide Tables</a>
                </nav>
            -->
            </header>
            <div class="component">
                <h2>This is made for making FFCS time table easily.</h2>
                <h3>All you have to do is, just add your slots, and, <em>you're done</em></h3>
                <p>All done just to save your time and to reduce complexity.. :)</p>
                
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                {!! Form::open(array('url' => 'submit')) !!}
                    <p>
                    {!! Form::label('courseCode', 'Course Code: ') !!}
                    {!! Form::text('courseCode') !!}
                    </p>
                    <p>
                    {!! Form::label('courseName', 'Name of the course: ') !!}
                    {!! Form::text('courseName') !!}
                    </p>
                    <p>
                    {!! Form::label('credits', 'Credits for this course: ') !!}
                    {!! Form::text('credits') !!}
                    </p>
                    <p>
                    {!! Form::label('courseSlot', 'Please Select Slot: ') !!}
                    {!! Form::select('courseSlot', $slots) !!}
                    </p>
                    {!! Form::submit('Register', array('class'=>'action-button shadow animate blue')) !!}
                {!! Form::close() !!}
                <div id="target">
                <table>
                    <thead>
                        <tr>
                            <th>Days/Hours</th><th>8-8:50</th><th>9-9:50</th><th>10-10:50</th><th>11-11:50</th><th>12-12:50</th><th>12:40-1:30</th><th>Lunch</th><th>2-2:50</th><th>3-3:50</th><th>4-4:50</th><th>5-5:50</th><th>6-6:50</th><th>6:40-7:30</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Monday</th><td id="1">A1/L1</td><td id="6">F1/L2</td><td id="11">C1/L3</td><td id="16">E1/L4</td><td id="21">TD1/L5</td><td id="26">L6</td><td></td><td id="31">A2/L28</td><td id="36">F2/L29</td><td id="41">C2/L30</td><td id="46">E2/L31</td><td id="51">TD2/L32</td><td id="56">L33</td>
                        </tr><tr>
                            <th>Tuesday</th><td id="2">B1/L7</td><td id="7">G1/L8</td><td id="12">D/L9</td><td id="17">TA1/L10</td><td id="22">TF1/L11</td><td id="27">L12</td><td></td><td id="32">B2/L34</td><td id="37">G2/L35</td><td id="42">D2/L36</td><td id="47">TA2/L37</td><td id="52">TF2/L38</td><td id="57">L39</td>
                        </tr><tr>
                            <th>Wednesday</th><td id="3">C1/L13</td><td id="8">F1/L14</td><td id="13">E1/L15</td><td></td><td></td><td></td><td></td><td id="33">C2/L40</td><td id="38">F2/L41</td><td id="43">E2/L42</td><td id="48">TB2/L43</td><td id="53">TG2/L44</td><td id="58">L45</td>
                        </tr><tr>
                            <th>Thursday</th><td id="4">D1/L16</td><td id="9">A1/L17</td><td id="14">F1/L18</td><td id="19">C1/L19</td><td id="24">TE1/L20</td><td id="29">L21</td><td></td><td id="34">D2/L46</td><td id="39">A2/L47</td><td id="44">F2/L48</td><td id="49">C2/L49</td><td id="54">TE2/L50</td><td id="59">L51</td>
                        </tr><tr>
                            <th>Friday</th><td id="5">E1/L22</td><td id="10">B1/L23</td><td id="15">G1/L24</td><td id="20">D1/L25</td><td id="25">TC1/L26</td><td id="30">L27</td><td></td><td id="35">E2/L52</td><td id="40">B2/L53</td><td id="45">G2/L54</td><td id="50">D2/L55</td><td id="55">TC2/L56</td><td id="60">L57</td>
                        </tr><tr>
                            <th>Saturday</th><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td></td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td>
                        </tr><tr>
                            <th>Sunday</th><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td></td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td><td>No class</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <input type="submit" value="Download" class="action-button shadow animate blue" onclick="capture();" />
                <form method="POST" enctype="multipart/form-data" action="save" id="myForm">
                    <input type="hidden" name="img_val" id="img_val" value="" />
                </form>
            </div>
            
        </div><!-- /container -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js"></script>
        <script src="js/jquery.stickyheader.js"></script>
        <script type="text/javascript" src="js/html2canvas.js"></script>
        <script type="text/javascript" src="js/jquery.plugin.html2canvas.js"></script>

        <script type="text/javascript">
            $(document).ready(function(){
                $.get( "tableinfo", {'_token': $('input[name=_token]').val() },function( data ) {
                    $.each($.parseJSON(data), function( index, value ) {
                      $('#'+value).addClass('err');
                    });
                });
            });
            </script>
            <script type="text/javascript">
                function capture() {
                    $('#target').html2canvas({
                        onrendered: function (canvas) {
                            //Set hidden field's value to image data (base-64 string)
                            $('#img_val').val(canvas.toDataURL("image/png"));
                            //Submit the form manually
                            document.getElementById("myForm").submit();
                        }
                    });
                }
            </script>
            
    </body>
</html>
