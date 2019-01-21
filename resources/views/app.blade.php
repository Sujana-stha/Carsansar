<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		 <meta name="csrf-token" content="{{ csrf_token() }}">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="msapplication-tap-highlight" content="no">
		<meta name="description" content="Vehicles Inventory Management System ">
		<meta name="keywords" content="cars, SUVs, jeep, pickup, truck">
               
        <title>whrepo</title>
        <!-- <link href="{{asset('materialize-admin/css/themes/collapsible-menu/materialize.css')}}" type="text/css" rel="stylesheet">
        <link href="{{asset('materialize-admin/css/themes/collapsible-menu/style.css')}}" type="text/css" rel="stylesheet">
        <link href="{{asset('materialize-admin/vendors/perfect-scrollbar/perfect-scrollbar.css')}}" type="text/css" rel="stylesheet">
        <link href="{{asset('materialize-admin/vendors/jvectormap/jquery-jvectormap.css')}}" type="text/css" rel="stylesheet">
        <link href="{{asset('materialize-admin/vendors/flag-icon/css/flag-icon.min.css')}}" type="text/css" rel="stylesheet"> -->
		<link href="{{asset('materialize-admin/vendors/dropify/css/dropify.min.css')}}" type="text/css" rel="stylesheet">
		<link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
		<link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
		
		
    </head>
    <body>
        <div id="root"></div>
		
        <!-- ================================================
	    Scripts
	    ================================================ -->
        <script src="{{asset('js/app.js')}}" ></script>
	    <!-- jQuery Library -->
	    <script type="text/javascript" src="{{asset('vendors/jquery-3.2.1.min.js')}}"></script>
	    <!--materialize js-->
		<script type="text/javascript" src="{{asset('js/materialize.min.js')}}"></script>
	    <!--scrollbar-->
	    <script type="text/javascript" src="{{asset('vendors/perfect-scrollbar/perfect-scrollbar.min.js')}}"></script>
	    <!-- chartjs -->
	    <script type="text/javascript" src="{{asset('vendors/chartjs/chart.min.js')}}"></script>
	    <!-- sparkline -->
	    <script type="text/javascript" src="{{asset('vendors/sparkline/jquery.sparkline.min.js')}}"></script>
	    <!-- google map api -->
	    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAZnaZBXLqNBRXjd-82km_NO7GUItyKek"></script>
	    <!--jvectormap-->
	    <script type="text/javascript" src="{{asset('vendors/jvectormap/jquery-jvectormap-1.2.2.min.js')}}"></script>
	    <script type="text/javascript" src="{{asset('vendors/jvectormap/jquery-jvectormap-world-mill-en.js')}}"></script>
		<script type="text/javascript" src="{{asset('vendors/jvectormap/vectormap-script.js')}}"></script>
		<script type="text/javascript" src="{{asset('vendors/dropify/js/dropify.min.js')}}"></script>
	    <!--google map-->
<!-- 	    <script type="text/javascript" src="{{asset('js/scripts/google-map-script.js')}}"></script> -->
	    <!--plugins.js - Some Specific JS codes for Plugin Settings-->
	    <script type="text/javascript" src="{{asset('js/plugins.js')}}"></script>
	    <!--card-advanced.js - Page specific JS-->
		<!-- <script type="text/javascript" src="{{asset('js/scripts/dashboard-analytics.js')}}"></script> -->
		  <!--form-file-uploads.js - Page Specific JS codes-->
		  <script type="text/javascript" src="{{asset('js/scripts/form-file-uploads.js')}}"></script>
		<!--custom-script.js - Add your own theme custom JS-->
	    <script type="text/javascript" src="{{asset('js/custom-script.js')}}"></script>
    </body>
</html>