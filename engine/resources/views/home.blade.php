@extends('app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="panel panel-default">
				<div class="panel-heading">Home</div>

				<div class="panel-body">
					<p>You are logged in!</p>

                    <p>Go to Sales Force Automation system</p>
                    <a href="bookings" class="btn btn-primary">Go!</a>
                    <a href="/engine/public/auth/logout" class="btn btn-danger" style="float: right">Logout</a>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
