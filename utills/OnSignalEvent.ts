export default function onSignalEvent(func: () => void) {
	['SIGUSR2'].forEach((sig_event) => {
		process.once(sig_event, (err) => {
			func();
		});
	});
}
