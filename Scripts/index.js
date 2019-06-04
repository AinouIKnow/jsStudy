let tableCnt = 1	// テーブルID
let timeCnt = 0		// 勉強時間

// 勉強時間のアイコン(1H)を増やす
function AddTime(timeAreaId){
	let icon
	let timeArea = document.getElementById(timeAreaId);
	icon = document.createElement("span");
	icon.setAttribute("class", "icon");
	timeArea.appendChild(icon);
	timeCnt++;
}

// 勉強時間のアイコン(1H)を減らす
function DelTime(timeAreaId){
	let timeArea = document.getElementById(timeAreaId);
	if (timeArea.childNodes.length > 0){
		timeArea.removeChild(timeArea.lastChild);
		timeCnt--;
	}	
}

// テーブル(勉強科目)を削除する
function DelTable(tableId, timeAreaId){
	// テーブル削除の際、現在の勉強時間も減らす
	let timeArea = document.getElementById(timeAreaId);
	for (let i = timeArea.childNodes.length - 1; i >= 0; i--) {
		timeArea.removeChild(timeArea.childNodes[i]);
		timeCnt--;
	}
	let myTable = document.getElementById("area");
	let delTable = document.getElementById(tableId);
	myTable.removeChild(delTable);
}

// 新規テーブル(勉強科目)作成
function AddTable(){
	let text
	// 未入力の場合は「UnKnown」をセット
	if ($('#form [name=text]').val() == ""){
		text = "UnKnown";
	} else {
		text = $('#form [name=text]').val();
	}
	// divタグの作成
	let childObject = document.createElement("div");
	// id, class, データをセットする
	childObject.id = 'table' + String(tableCnt);
	childObject.className = 'study_zone';
	childObject.innerHTML = '<div class="text_area effect1">' + text + '</div>\r\n' +
							'<div class="time_area effect1" id="time_area' + String(tableCnt) + '"></div>\r\n' +
							'<input type="button" class="btn increase" value="+1H" onclick="AddTime(\'time_area' + String(tableCnt) + '\');"/>\r\n' +
							'<input type="button" class="btn decrease" value="-1H" onclick="DelTime(\'time_area' + String(tableCnt) + '\');"/>\r\n' +
							'<input type="button" class="btn reset" value="削除" onclick="DelTable(\'table' + String(tableCnt) + '\', \'time_area' + String(tableCnt) + '\');"/>\r\n';
	// 作成したdivタグをセットする位置を決め追加
	let parentObject = document.getElementById("area");
	parentObject.appendChild(childObject);
	// idの番号を増やす
	tableCnt++;
	// 入力フォームのテキストをクリア
	document.test_form.text.value="";
	return false;
}

// 合計時間の表示
function displayTime(){
	let message
	// 合計時間によって表示する文章を変更する
	if(timeCnt == 0){
		document.getElementById("total_area").innerText = '勉強頑張って！';
		exit;
	} else if(timeCnt < 3){
		message = 'まだ頑張れます！'
	} else if (timeCnt >= 3 & timeCnt < 6) { 
		message = 'お疲れ様でした！'
	} else { 
		message = 'よく頑張りました！　えらい！！！！！！'
	}
	
	document.getElementById("total_area").innerText = '勉強時間の合計は' + String(timeCnt) + '時間です！！！\r\n' + message;
}