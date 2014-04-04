/**
 * Created by Stefano on 01/04/14.
 */
onmessage = function (event) {
	var data = event.data;
	switch (data.cmd) {
		case 'start':
			this.finished = 0;
			this.from = data.from;
			this.to = data.to;
			this.worker = data.worker;
			if (this.from === this.to) {
				this.postMessage({cmd: 'finished', worker: this.worker});
				close();
			}
			break;
		case 'finished':
			this.finished++;
			if (this.finished > 1) {
				this.array = data.array;
				merge(this.from, this.to, this.array);
				this.postMessage({cmd: 'finished', worker: this.worker});
				close();
			}
			break;
		default :
			this.postMessage('Something went wrong');
	}
};

//noinspection FunctionWithMultipleLoopsJS
function merge(from, to, array) {
	var m = Math.floor((from + to) / 2);
	var left = [];
	var right = [];
	for (var i = 0; i < m - from + 1; i++)
		left[i] = array[from + i];
	for (var j = 0; j < to - m; j++)
		right[j] = array[m + j + 1];
	var x = 0, y = 0;
	for (var k = from; k < to + 1; k++) {
		if (y > to - m - 1 || (left[x] <= right[y] && x < m - from + 1)) {
			this.postMessage({cmd: 'replace', index: k, value: left[x]});
			x++;
		} else {
			this.postMessage({cmd: 'replace', index: k, value: right[y]});
			y++;
		}
	}
}