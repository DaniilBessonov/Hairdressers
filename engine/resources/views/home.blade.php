@extends('app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-10 col-md-offset-1">
			<div class="panel panel-default">
				<div class="panel-heading">Главное меню</div>

				<div class="panel-body">
					<p>Вы успешно авторизовались!</p>

                    <p>Выберите город</p>
                    <a href="bookings.95" class="btn btn-primary">Нижний Новгород</a>
                    <a href="bookings.49" class="btn btn-primary">Екатеринбург</a>
                    <a href="bookings.42" class="btn btn-primary">Воронеж</a>
                    <a href="/engine/public/auth/logout" class="btn btn-danger" style="float: right">Выход</a>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
