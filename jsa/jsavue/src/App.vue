<template>
  <div id="app">
    <div id="page-wrapper">

				<!-- Header -->
					<header id="header">
						<span class="logo"><a href="jsas/">Job Safety Analysis Library</a></span>
					</header>
          
          <!-- <div class="ui text container"> -->
            <!-- <div class="ui one column grid"> -->
              <!-- <div class="column"> -->
                <router-view />
              <!-- </div> -->
            <!-- </div> -->
          <!-- </div> -->

				<!-- Copyright -->
					<section class="wrapper style2 copyright">
						<div class="inner">
							&copy; JSA Library. All rights reserved.
						</div>
					</section>

			</div>

    <script type="application/javascript" defer src="assets/js/jquery.min.js"></script>
    <script type="application/javascript" defer src="assets/js/jquery.scrollex.min.js"></script>
    <script type="application/javascript" defer src="assets/js/jquery.scrolly.min.js"></script>
    <script type="application/javascript" defer src="assets/js/browser.min.js"></script>
    <script type="application/javascript" defer src="assets/js/breakpoints.min.js"></script>
    <script type="application/javascript" defer src="assets/js/util.js"></script>
    <script type="application/javascript" defer src="assets/js/main.js"></script>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
  @import 'assets/css/main.css';
</style>