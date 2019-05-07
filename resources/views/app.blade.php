<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="msapplication-tap-highlight" content="no">
		<meta name="description" content="Vehicles Inventory Management System ">
		<meta name="keywords" content="cars, SUVs, jeep, pickup, truck">
               
        <title>whrepo</title>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
       
		<!-- BEGIN: VENDOR CSS-->
		<link rel="stylesheet" type="text/css" href="{{asset('vendors/vendors.min.css')}}">
    	<link rel="stylesheet" type="text/css" href="{{asset('vendors/animate-css/animate.css')}}">
		<!-- <link rel="stylesheet" type="text/css" href="{{asset('app-assets/vendors/chartist-js/chartist.min.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('app-assets/vendors/chartist-js/chartist-plugin-tooltip.css')}}"> -->
		<!-- END: VENDOR CSS-->
		<!-- BEGIN: Page Level CSS-->
		<!-- <link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/themes/vertical-menu-nav-dark-template/materialize.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/themes/vertical-menu-nav-dark-template/style.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/pages/dashboard-modern.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/pages/login.css')}}"> -->
		<!-- <link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/pages/intro.css')}}"> -->
		<!-- END: Page Level CSS-->
		<!-- BEGIN: Custom CSS-->
		<!-- <link rel="stylesheet" type="text/css" href="{{asset('app-assets/css/custom/custom.css')}}"> -->
		<link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
		<!-- END: Custom CSS-->
		<script>
			window.Laravel = {!! json_encode([
				'csrfToken' => csrf_token(),
				'base_url' => env("BASE_URL"),
				'client_secret' => env("PASSWORD_CLIENT_SECRET"),
				'super_admin' => env("SUPER_ADMIN_NAME")
			]) !!}
		</script>
		
    </head>
    <body class="vertical-layout page-header-light vertical-menu-collapsible vertical-menu-nav-dark 2-columns  " data-open="click" data-menu="vertical-menu-nav-dark" data-col="2-columns">
        <div id="root"></div>
		
        <!-- ================================================
	    Scripts
	    ================================================ -->
		<script src="{{asset('js/app.js')}}" ></script>
	    <!-- BEGIN VENDOR JS-->
		<script src="{{asset('js/materialize-admin/vendors.min.js')}}" type="text/javascript"></script>
		<!-- BEGIN VENDOR JS-->
		<!-- TinyMCE editor link -->
		<script src="https://cloud.tinymce.com/5/tinymce.min.js"></script>
		<!-- BEGIN THEME  JS-->
		<script src="{{asset('js/materialize-admin/plugins.js')}}" type="text/javascript"></script>
		<script src="{{asset('js/materialize-admin/custom/custom-script.js')}}" type="text/javascript"></script>
		<!-- END THEME  JS-->
		<!-- BEGIN PAGE LEVEL JS-->
		<!-- <script src="{{asset('app-assets/js/scripts/dashboard-modern.js')}}" type="text/javascript"></script> -->
		<!-- <script src="{{asset('js/materialize-admin/custom/scripts/intro.js')}}" type="text/javascript"></script> -->
		<!-- END PAGE LEVEL JS-->
    </body>
</html>