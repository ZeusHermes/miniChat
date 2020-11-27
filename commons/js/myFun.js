export default {
	dataTime: function(time) {
		let old = new Date(time)
		let now = new Date()
		let d = old.getTime()
		let h = old.getHours()
		let m = old.getMinutes()
		let Y = old.getFullYear()
		let M = old.getMonth()
		let D = old.getDate()

		let md = now.getTime()
		let mh = now.getHours()
		let mm = now.getMinutes()
		let mY = now.getFullYear()
		let mM = now.getMonth()
		let mD = now.getDate()
		if (D === mD && M === mM && Y === mY) {
			return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`
		}else if(D+1 === mD && M === mM && Y === mY){
			return `昨天 ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`
		}else if(D+2 === mD && M === mM && Y === mY){
			return `前天 ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`
		}else{
			return `${Y}/${M+1}/${D}`
		}
	}
}
