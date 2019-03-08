// do NOT touch this code unless you are absolutely sure what you are doing!

var bold=document.querySelector('#bold');
var italic=document.querySelector('#italic');
var underline=document.querySelector('#underline');
var size1=document.querySelector('#size1');
var size2=document.querySelector('#size2');
var post=document.querySelector('#post');
var title=document.querySelector('#title');
var addLink=document.querySelector('#addLink');
var hiddencontent=document.querySelector('#hiddencontent');

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
        if(bold==document.activeElement||italic==document.activeElement||underline==document.activeElement||
            size1==document.activeElement||size2==document.activeElement){
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
underline.addEventListener('click',function(){
    if(postBlur)
        caretPosition();
    post.focus();
    underline.classList.toggle('selected');
    document.execCommand('underline');
});
size1.addEventListener('click',function(){
    if(postBlur)
        caretPosition();
    post.focus();
    size1.classList.toggle('selected');
    if(size1.classList.contains('selected'))
        document.execCommand('formatBlock',false,'<h4>');
    else
        document.execCommand('formatBlock',false,'div');
});
size2.addEventListener('click',function(){
    if(postBlur)
        caretPosition();
    post.focus();
    size2.classList.toggle('selected');
    if(size2.classList.contains('selected'))
        document.execCommand('formatBlock',false,'<h5>');
    else
        document.execCommand('formatBlock',false,'div');
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
    if(document.queryCommandState("underline"))
        underline.classList.toggle('selected',true);
    else
        underline.classList.toggle('selected',false);

    var parentNode=window.getSelection().anchorNode;
    if(parentNode.parentElement.nodeName==="H4"||parentNode.parentElement.parentElement.nodeName==="H4"||
        parentNode.parentElement.parentElement.parentElement.nodeName==="H4"||
        parentNode.parentElement.parentElement.parentElement.parentElement.nodeName==="H4")
        size1.classList.toggle('selected',true);
    else
        size1.classList.toggle('selected',false);
    if(parentNode.parentElement.nodeName==="H5"||parentNode.parentElement.parentElement.nodeName==="H5"||
        parentNode.parentElement.parentElement.parentElement.nodeName==="H5"||
        parentNode.parentElement.parentElement.parentElement.parentElement.nodeName==="H5")
        size2.classList.toggle('selected',true);
    else
        size2.classList.toggle('selected',false);
    
    var s=window.getSelection();    
    anchorNode=s.anchorNode;
    anchorOffset=s.anchorOffset;
    focusNode=s.focusNode;
    focusOffset=s.focusOffset;

    hiddencontent.value=post.innerHTML;
    },10);
    if(e){
        if(e.which == 66 && e.ctrlKey){
            bold.classList.toggle('selected');
        }
        if(e.which == 73 && e.ctrlKey){
            italic.classList.toggle('selected');
        }
        if(e.which == 85 && e.ctrlKey){
            underline.classList.toggle('selected');
        }
    }
}
// ----------------------------------------

var linkValue;
var linkAdd='';

addLink.addEventListener('click',()=>{if(postBlur)
    setTimeout(()=>{
        s=document.getSelection();
        var range = s.getRangeAt(0);

        var temp=s.toString();
        if(temp!='')
            linkValue=temp;
        if(linkAdd=='')
            linkAdd='https://';

        var linkInput=$(range.startContainer.parentNode).find('div.linkInput');
        if(!linkInput.length){
            anchorNode=s.anchorNode;
            anchorOffset=s.anchorOffset;
            // focusNode=s.focusNode;
            // focusOffset=s.focusOffset;

            range.deleteContents();

            var newNode = document.createElement("input");
            newNode.setAttribute('placeholder','Text');
            newNode.setAttribute('value',linkValue);
            newNode.setAttribute('style','margin:10px;width:210px');

            var newNode4 = document.createElement("input");
            newNode4.setAttribute('placeholder','Link');
            newNode4.setAttribute('value',linkAdd);
            newNode4.setAttribute('style','margin:0 10px 10px 10px;width:210px');

            var newNode5=document.createElement('button');
            newNode5.setAttribute('class','btn-outline-light linkApply');
            newNode5.setAttribute('style','width:100px;color:green;border:1px solid lightgray');
            var newNode6=document.createTextNode('Apply');


            var newNode3=document.createElement('div');
            newNode3.setAttribute('class','linkInput');
            newNode3.setAttribute('style','border:1px solid lightgray;background:white;width:340px');

            var newNode1 = document.createElement("span");
            newNode1.setAttribute('contenteditable','false');
            newNode1.setAttribute('class','selectedTextPost');
            var newNode2 = document.createTextNode(linkValue);
            
            range.surroundContents(newNode);
            range.surroundContents(newNode3);
            newNode3.appendChild(newNode4);
            newNode3.appendChild(newNode5);
            newNode5.appendChild(newNode6);
            range.surroundContents(newNode1);
            newNode1.appendChild(newNode2);

            var linkInput=$(range.startContainer).find('.linkInput');
            linkInput[0].style.display='inline';

            // ---------------------------------------------------------------------
            
            $(range.startContainer).find('button')[0].addEventListener('click',()=>{
                var range1 = document.createRange();
                range1.selectNode($(range.startContainer).find('.selectedTextPost')[0]);                    
                
                var title=$(range1.startContainer).find('input')[0].value;
                var link=$(range1.startContainer).find('input')[1].value;

                range1.deleteContents();
                
                var newNode = document.createElement("span");
                newNode.setAttribute('contenteditable','false');
                newNode.setAttribute('class','linkText');
                newNode.setAttribute('onclick','linkTextClick(this);');

                var newNode1=document.createElement('div');
                newNode1.setAttribute('class','editLinkDiv');
                newNode1.setAttribute('style','border:1px solid lightgray;background:white;min-width:200px');

                var newNode2=document.createElement('a');
                newNode2.setAttribute('href',link);
                newNode2.setAttribute('target','_blank');

                var newNode3 = document.createTextNode(title);
                var newNode4 = document.createTextNode(link);

                var newNode5 = document.createElement('span');
                newNode5.setAttribute('class','editLink');
                newNode5.setAttribute('onclick','editLinkClick(this);');
                newNode5.setAttribute('style','color:green;padding:5px');
                var newNode6 = document.createTextNode('Edit');

                var newNode7 = document.createElement('span');
                newNode7.setAttribute('class','removeLink');
                newNode7.setAttribute('onclick','removeLinkClick(this);');
                newNode7.setAttribute('style','color:red;padding:5px');
                var newNode8 = document.createTextNode('Remove');

                range1.surroundContents(newNode2);
                range1.surroundContents(newNode1);
                newNode2.appendChild(newNode4);
                newNode1.appendChild(newNode5);
                newNode1.appendChild(newNode7);
                newNode5.appendChild(newNode6);
                newNode7.appendChild(newNode8);
                range1.surroundContents(newNode);
                newNode.appendChild(newNode3);
            });
            $(range.startContainer).find('input')[0].focus();
        }
        else{
            range.deleteContents();
            var newNode = document.createElement('span');
            var newNode1 = document.createTextNode(linkValue);
            range.surroundContents(newNode);
            newNode.appendChild(newNode1);
        }
        // else{
        //     if(linkInput[0].style.display==='inline'){
        //         linkInput[0].style.display='none';
        //     }
        //     else{
        //         linkInput[0].style.display='inline';
        //     }
        // }
        linkValue='';
        linkAdd='';
    },0);
});
function linkTextClick(obj){
    temp=obj.childNodes[0].style.display;
    if(temp===''||temp=='none'){
        obj.childNodes[0].style.display='inline';
    }
    if(temp==='inline')
        obj.childNodes[0].style.display='none';
}

function editLinkClick(obj){
    var range1 = document.createRange();
    range1.selectNode($(obj)[0].parentNode);
    
    linkAdd=$(range1.startContainer).find('a')[0].innerText;
    linkValue=$(range1.startContainer)[0].childNodes[1].nodeValue;

    var range2 = document.createRange();
    range2.selectNode($(obj)[0].parentNode.parentNode);
    range2.deleteContents();

    // var newNode = document.createElement('span');
    // newNode.setAttribute('contenteditable','false');
    // newNode.setAttribute('class','selectedTextPost');
    // var newNode1 = document.createTextNode(linkValue);
    // range2.surroundContents(newNode);
    // newNode.appendChild(newNode1);
    
    $(addLink).click();
}

function removeLinkClick(obj){
    var range1 = document.createRange();
    range1.selectNode($(obj)[0].parentNode);
    let text=$(range1.startContainer)[0].childNodes[1].nodeValue;

    var range2 = document.createRange();
    range2.selectNode($(obj)[0].parentNode.parentNode);
    range2.deleteContents();

    var newNode = document.createElement('span');
    var newNode1 = document.createTextNode(text);
    range2.surroundContents(newNode);
    newNode.appendChild(newNode1);
}

// function linkInputClick(){
//     if(linkInput.value){
//         post.focus();
//         caretPosition();
//         post.focus();


//         s=document.getSelection();
//         var range = s.getRangeAt(0);
//         var newNode = document.createElement("a");
//         newNode.setAttribute('href',linkInput.value);
//         newNode.setAttribute('target','_blank');
//         newNode.setAttribute('contenteditable','false');
//         newNode.setAttribute('class','postLink');
//         range.surroundContents(newNode);


//         // document.execCommand('createLink',true,linkInput.value);
//         // var linkValue=document.getSelection().focusNode.nodeValue;
//         // if(linkValue==null){
//         //     linkValue=document.getSelection().focusNode.innerText;
//         //     if(linkValue==null||linkValue=='')
//         //         linkValue=linkInput.value;
//         // }
//         // document.execCommand('insertHTML', false,'&nbsp;<a contenteditable="false"
//         //   style="" href="'+linkInput.value+'" target="_blank"><span contenteditable="true">'+linkValue+'
//         //   </span></a>&nbsp;');
//     }
//     linkInput.value='';
//     linkInput.style.display='none';
// }

$(".socialMedia-button").click(function() {
    $($('.socialMedia-icon')[0]).toggleClass('socialMedia-hidden');
    setTimeout(()=>{
        $($('.socialMedia-icon')[1]).toggleClass('socialMedia-hidden');
    },125);
    setTimeout(()=>{
        $($('.socialMedia-icon')[2]).toggleClass('socialMedia-hidden');
    },250);
    setTimeout(()=>{
        $($('.socialMedia-icon')[3]).toggleClass('socialMedia-hidden');
    },375);
  });