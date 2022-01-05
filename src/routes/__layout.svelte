<script>
	import '../styles/tailwind.css'
</script>

<body class='w-screen flex flex-col flex-wrap items-center bg-primary bg-triangles'>
	<slot/>
</body>

<style>
	body {
		background-image: url('/falling-triangles.svg');
		/* background-color: #DFDBE5; */
		/* background-image: url("data:image/svg+xml,%3Csvg 
		xmlns='http://www.w3.org/2000/svg' 
		width='36' height='72' viewBox='0 0 36 72'
		%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.31'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
	}
</style>