<!DOCTYPE HTML>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="author" content="kesspess">
		<meta name="robots" content="index,follow">

		<title>Convex Hull algorithms | POGR1 </title>

		<link rel="shortcut icon" href="<?php echo mtime('favicon.ico') ?>">
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.0/cerulean/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo mtime('screen.css') ?>">

		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js"></script>
	</head>

	<body>

		<div class="container">

			<div class="page-header">
				<h1>
					<a href="">Convex Hull</a>
				</h1>
			</div>


			<noscript>
				<p class="alert alert-danger">Please turn on javascript.</p>
			</noscript>


			<div class="row">
				<div class="col-sm-3">
					<h3>Points</h3>

					<div class="row">
						<div class="col-sm-2 text-right">
							<span id="point-count-info"></span>
						</div>

						<div class="col-sm-10">
							<input type="range" min="10" max="200" step="10" value="40" id="point-count">
						</div>
					</div>

					<button class="btn btn-block btn-sm btn-success" id="generate">Generate</button>

					<div id="algs">
						<h3>Algorithms</h3>

						<table class="table table-condensed">
							<thead>
								<tr>
									<th>Name</th>
									<th>
										<abbr title="Big O notation">O</abbr>
									</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>
										<button class="btn btn-block btn-sm btn-danger" id="alg-primitive" disabled>Primitive</button>
									</td>

									<td>n<sup>4</sup></td>
								</tr>

								<tr>
									<td>
										<button class="btn btn-block btn-sm btn-info" id="alg-gift-packing" disabled>GiftPacking</button>
									</td>

									<td>n×<abbr title="h &hellip; number of vertices">h</abbr></td>
								</tr>

								<tr>
									<td>
										<button class="btn btn-block btn-sm btn-success" id="alg-quick-hull" disabled>QuickHull</button>
									</td>

									<td>n×<abbr title="h &hellip; number of vertices">h</abbr> - <abbr title="h &hellip; number of vertices">h</abbr>×log(n)</td>
								</tr>
							</tbody>
						</table>
					</div>

					<button class="btn btn-block btn-sm btn-primary" id="clear" disabled>Clear</button>
				</div>

				<div class="col-sm-9">
					<canvas id="canvas" width="800" height="450"></canvas>
				</div>
			</div>

		</div>

		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="//cdn.rawgit.com/caleb531/jcanvas/master/jcanvas.min.js"></script>
		<script type="text/javascript" src="<?php echo mtime('script.js') ?>"></script>

	</body>
</html>

<?php

function mtime($s) {
	$mtime = @filemtime(__DIR__ . '/' . $s);
	return $s . ($mtime === FALSE ? '' : '?' . $mtime);
}
