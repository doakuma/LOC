var editor = function(){
		var _dataTarget;

	var edit = {
		// Editor Buton click
		button : function () {
			$('html').delegate('button[data-edit]','click',function(){
				var btnType = $(this).attr('data-edit');
				switch (btnType) {
					case 'image':
						editor.callLayer(this)
						break;
					case 'close' :
						editor.closeLayer(this)
						break;
					case 'confirm' :
						editor.replaceImg(this)
						break;
					default:
						break;
				}
			});
		},

		// Editor Area Activate
		editArea : function(){
			$('html').delegate('*[data-edit=text]','mousedown', function(){
				var offsetTop = $(this).offset().top - 220;
				$('.layerEditor').css({top: offsetTop});
				$('.layerEditor').find('select').
				$('.contExhi').removeAttr('id');
				$(this).attr('id','dataTarget');
			});
		},
		
		colorPick : function(typeColor){
			$('html').delegate('.jscolor','change',function(){
				var chkType = $(typeColor).attr('data-edit'),
					chkColor = $(typeColor).val();
				switch (chkType){
				case 'FontColor':
					span.style.color = '#' + chkColor
					break;
				case 'BgColor':
					break;
				default :
					break;
				}
			});
		},

		// replace Image
		replaceImg : function(obj) {
			var imgSrc = $(obj).closest('.listThumb').find('img').attr('src');
			$('#editTarget').find(' > img').attr('src', imgSrc);
		},

		// callLayer
		callLayer : function (obj){
			$(obj).closest('.boxExhiImg').attr('id','editTarget');
			$('*[data-layer=boxLayer]').addClass('active');
		},

		// close layer
		closeLayer : function(obj) {
			$(obj).closest('*[data-layer=boxLayer]').removeClass('active');
			$('.boxExhiImg').removeAttr('id');
		},

		dragArea : function(){
			$('html').delegate('#dataTarget','mouseup', function(){

				if (window.getSelection() || document.getSelection()) {
					var range = window.getSelection().getRangeAt(0);
					var selectionContents = range.extractContents();
					var span = document.createElement("span");
					span.appendChild(selectionContents);
					range.insertNode(span);

					var range = null;
					var selectionContents = null;
					var span = null;

				}
				editor.editText()
			});
		},

		editText : function() {
			_dataTarget = $('#dataTarget'),
			_textTarget = _dataTarget.find('span');
			$('html').delegate('button[data-editor]','click',function(){
				var typeEdit = $(this).attr('data-editor');
				switch (typeEdit) {
					case 'FontWgBold':
						_textTarget.css({fontWeight: 'bold'});
						break;
					case 'TextDcUdLine':
						_textTarget.css({textDecoration: 'underline'});
						break;
					case 'TxAlLeft':
						_dataTarget.css({textAlign: 'left'});
						break;
					case 'TxalCenter':
						_dataTarget.css({textAlign: 'center'});
						break;
					case 'TxalRight':
						_dataTarget.css({textAlign: 'right'});
						break;
					default :
						break;
				}
			});
			$('html').delegate('select[data-editor]','change',function(){
				var typeEdit = $(this).attr('data-editor'),
					editvalue = $(this).val();
				switch (typeEdit) {
					case 'FontFamily':
						_textTarget.css({fontFamily: editvalue});
						break;
					case 'FontSize':
						_textTarget.css({fontSize: editvalue + 'pt'});
						break;
					default :
						break;
				}
			});
		}
	}

	return edit;

}();

editor.button()
editor.editArea()
editor.replaceImg()
editor.dragArea()
editor.editText()
