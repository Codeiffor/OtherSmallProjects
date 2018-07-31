// do NOT touch this code unless you are absolutely sure what you are doing!

var bold=document.querySelector('#bold');
var italic=document.querySelector('#italic');
var post=document.querySelector('#post');
var title=document.querySelector('#title');
var addLink=document.querySelector('#addLink');
var linkInput=document.querySelector('.linkInput');

post.focus();
var anchorNode=window.getSelection().anchorNode;
var anchorOffset=0;
var focusNode=window.getSelection().anchorNode;
var focusOffset=0;
title.focus();

//buttons
var postBlur=false;
post.addEventListener('blur',()=>{
    setTimeout(()=>{
        if(bold==document.activeElement||italic==document.activeElement){
            postBlur=false;
        }
        else{
            postBlur=true;
        }
    },0);
});
bold.addEventListener('click',function(){
    if(postBlur)
        caretPosition();
    post.focus();
    bold.classList.toggle('selected');
    document.execCommand('bold');
});
italic.addEventListener('click',function(){
    if(postBlur)
        caretPosition();
    post.focus();
    italic.classList.toggle('selected');
    document.execCommand('italic');
});
function caretPosition(){
    var s=window.getSelection();
    s.collapse(anchorNode,anchorOffset);
    s.extend(focusNode,focusOffset);
    postBlur=false;
}

//post
post.addEventListener('keydown',buttonSelection);
post.addEventListener('focus',buttonSelection);
post.addEventListener('click',buttonSelection);
function buttonSelection(e){
    setTimeout(() => {
    if(document.queryCommandState("bold"))
        bold.classList.toggle('selected',true);
    else
        bold.classList.toggle('selected',false);
    if(document.queryCommandState("italic"))
        italic.classList.toggle('selected',true);
    else
        italic.classList.toggle('selected',false);
    
    var s=window.getSelection();
    anchorNode=s.anchorNode;
    anchorOffset=s.anchorOffset;
    focusNode=s.focusNode;
    focusOffset=s.focusOffset;
    },10);
    if(e){
        if(e.which == 66 && e.ctrlKey){
            bold.classList.toggle('selected');
        }
        if(e.which == 73 && e.ctrlKey){
            italic.classList.toggle('selected');
        }
    }
}
// ----------------------------------------

addLink.addEventListener('click',()=>{
    let temp=linkInput.style.display;
    if(temp=='inline'){
        linkInputClick();
    }
    if(temp==''||temp=='none'){
        linkInput.style.display='inline';
        s=document.getSelection();
        var range = s.getRangeAt(0);
        var newNode = document.createElement("span");
        newNode.setAttribute('class','selectedTextPost');
        range.surroundContents(newNode);
        var s=window.getSelection();
        anchorNode=s.anchorNode;
        anchorOffset=s.anchorOffset;
        focusNode=s.focusNode;
        focusOffset=s.focusOffset;
        linkInput.focus();
    }
});
linkInput.addEventListener('keydown',(event)=>{
    if(event.which==13)
        setTimeout(linkInputClick,0);
});
function linkInputClick(){
    if(linkInput.value){
        post.focus();
        caretPosition();
        post.focus();
        document.execCommand('createLink',true,linkInput.value);
        var linkValue=document.getSelection().focusNode.nodeValue;
        if(linkValue==null){
            linkValue=document.getSelection().focusNode.innerText;
            if(linkValue==null||linkValue=='')
                linkValue=linkInput.value;
        }
        document.execCommand('insertHTML', false,'&nbsp;<a contenteditable="false" style="" href="'+linkInput.value+'" target="_blank"><span contenteditable="true">'+linkValue+'</span></a>&nbsp;');
    }
    linkInput.value='';
    linkInput.style.display='none';
}