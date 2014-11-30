<!doctype html>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="author" content="kesspess">
		<meta name="robots" content="index,follow">

		<title>Convex Hull algorithms</title>

		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.0/spacelab/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo mtime('screen.css') ?>">

		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js"></script>
<?php if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1') { ?>
		<script type="text/javascript">(function(a,e,f,g,b,c,d){a.GoogleAnalyticsObject=b;a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};a[b].l=1*new Date;c=e.createElement(f);d=e.getElementsByTagName(f)[0];c.async=1;c.src=g;d.parentNode.insertBefore(c,d)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-57169534-1","auto");ga("send","pageview");</script>
<?php } ?>
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
							<input type="range" min="10" max="250" step="10" value="150" id="point-count">
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
										<button class="btn btn-block btn-sm btn-success" id="alg-quick-hull" disabled>Quick Hull</button>
									</td>

									<td>n×<abbr title="h &hellip; number of vertices">h</abbr>, <abbr title="h &hellip; number of vertices">h</abbr>×log(n)</td>
								</tr>

								<tr>
									<td>
										<button class="btn btn-block btn-sm btn-info" id="alg-gift-wrapping" disabled>Gift Wrapping</button>
									</td>

									<td>n×<abbr title="h &hellip; number of vertices">h</abbr></td>
								</tr>

								<tr>
									<td>
										<button class="btn btn-block btn-sm btn-danger" id="alg-primitive" disabled>Primitive</button>
									</td>

									<td>n<sup>4</sup></td>
								</tr>
							</tbody>
						</table>
					</div>

					<button class="btn btn-block btn-sm btn-primary" id="clear" disabled>Clear solution</button>
				</div>

				<div class="col-sm-9">
					<canvas id="canvas" width="800" height="450"></canvas>
				</div>
			</div>

		</div>


		<div class="modal fade" id="docs-modal" tabindex="-1" role="dialog">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>

						<h4 class="modal-title">Dokumentace</h4>
					</div>

					<div class="modal-body">
                        <h2>Konvexní obal bodů v&nbsp;rovině</h2>

						<h3>Autor</h3>

						<p>
							<a href="http://kesspess.1991.cz/">Petr Kessler</a><br>
							v&nbsp;rámci předmětu POGR1, akademický rok 2014, studijní obor APIN, FJFI ČVUT v&nbsp;Praze
						</p>


						<h3>O&nbsp;aplikaci</h3>

						<p>Aplikace slouží k&nbsp;demonstraci efektivity vybraných algoritmů hledajících konvexní obal množin bodů v&nbsp;rovině.</p>

						<p>Těmito algoritmy jsou:</p>

						<ul>
							<li>Primitivní algoritmus</li>
							<li>Algoritmus balení dárků</li>
							<li>Quick Hull</li>
						</ul>


						<h3>Použití</h3>

						<ol>
							<li>na slideru nastavíme počet náhodných bodů, které následně vygenerujeme tlačíkem &raquo;Generate&laquo; :-)</li>
							<li>zvolíme jeden ze 3 algoritmů a stiskneme jeho tlačítko</li>
							<li>v&nbsp;grafické oblasti se po chvilce objeví konvexní obal vč. informací o&nbsp;počtu provedených operací a&nbsp;času
								potřebném pro výpočet</li>
							<li>výsledek můžeme pro dané body vyčistit tlačítkem &raquo;Clear solution&laquo; a na stejnou sadu bodů použít pro srovnání
								efektivity algoritmus jiný</li>
						</ol>


						<h3>Zdroje</h3>

						<p>Při implementaci jsem vycházel z&nbsp;těchto zdrojů:</p>

						<ul>
							<li>Ing. Pavel Strachota, Ph.D.: <em>Výpočetní geometrie</em>, 2012 (<a href="http://saint-paul.fjfi.cvut.cz/base/sites/default/files/POGR/POGR1/05.vypocetni_geometrie.pdf">link</a>)</li>

							<li>Wikipedia (kolektiv autorů): <em>Centroid</em> (<a href="https://en.wikipedia.org/wiki/Centroid">link</a>)</li>
						</ul>


						<p>Aplikace využívá následující knihovny:</p>

						<ul>
							<li>
								<a href="http://jquery.com/">jQuery</a>
							</li>

							<li>
								<a href="http://calebevans.me/projects/jcanvas/">jCanvas</a>
							</li>

							<li>
								<a href="http://modernizr.com/">Modernizr</a>
							</li>

							<li>
								<a href="http://getbootstrap.com/">Twitter Bootstrap</a>
							</li>

							<li>
								<a href="http://bootswatch.com/">Bootswatch (Spacelab)</a>
							</li>
						</ul>

					</div>
				</div>
			</div>
		</div>


		<div id="footer">
			<a href="http://kesspess.1991.cz/">Petr Kessler</a> | <a href="#n" data-toggle="modal" data-target="#docs-modal">Docs (cs)</a> | <a href="https://github.com/uestla/convex-hull">GitHub</a> | POGR1 | FJFI CTU Prague | 2014
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
