<script>
	// export let type
</script>

<div class="lds">
	<div/>
	<div/>
	<div/>
</div>

<style>
	.lds {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;

		display: flex;
		align-items: center;
	}
	.lds div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: #fff;
		border-radius: 4px;
		animation: lds-facebook 1.2s ease infinite;
	}
	.lds div:nth-child(1) {
		left: 8px;
		animation-delay: -0.2s;
	}
	.lds div:nth-child(2) {
		left: 32px;
		animation-delay: -0.1s;
	}
	.lds div:nth-child(3) {
		left: 56px;
		animation-delay: 0;
	}
	@keyframes lds-facebook {
		0% {
			height: 64px;
		}

		70% {
			height: 32px;
		}

		100% {
			height: 64px;
		}
	}

</style>