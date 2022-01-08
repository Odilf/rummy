<script>
	import '../styles/tailwind.css'
</script>

<body class='w-screen flex flex-col items-center bg-primary bg-triangles absolute inset-0 overflow-x-hidden'>
	<slot/>
</body>

<style>
	body {
		background-image: url('/falling-triangles.svg');
	}
</style>