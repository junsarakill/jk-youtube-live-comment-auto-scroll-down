// ==UserScript==
// @name         YouTube 라이브 채팅 자동 스크롤 다운
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  유튜브 라이브 채팅창이 멈출때 생기는 파란색 화살표 버튼을 자동으로 클릭하여 최신 메시지를 유지합니다.
// @author       jkakk
// @match        *://www.youtube.com/live_chat*
// @match        *://www.youtube.com/watch*
// @updateURL    https://raw.githubusercontent.com/junsarakill/jk-youtube-live-comment-auto-scroll-down/main/JKYLCASD.user.js
// @downloadURL  https://raw.githubusercontent.com/junsarakill/jk-youtube-live-comment-auto-scroll-down/main/JKYLCASD.user.js
// @grant        none
// ==/UserScript==

(function() 
{
    'use strict';

    // 버튼 찾기 주기
    const FIND_INTERVAL = 3000;

    // 스크롤 버튼 찾기
    function findScrollButton() 
    {
        // aria-label 로 버튼을 찾습니다.
        // '댓글 더보기' 텍스트는 로케일(언어)에 따라 달라질 수 있습니다.
        const button = document.querySelector('button[aria-label="댓글 더보기"]');

        // 다른 선택자 옵션 (만약 위의 것이 잘 작동하지 않을 경우)
        // 1. ID가 고유하다고 확신할 때:
        // const button = document.getElementById('button');

        // 2. 클래스와 aria-label 조합:
        // const button = document.querySelector('button.yt-icon-button[aria-label="댓글 더보기"]');

        return button;
    }

    // 버튼이 화면에 보이고 활성화되어 있는지 확인하는 함수
    function checkButtonVisible(button) 
    {
        if (!button) 
            return false;

        // button.offsetParent !== null 은 요소가 DOM에 연결되어 있고 숨겨지지 않았는지 확인
        // button.disabled가 false인지는 버튼이 비활성화 상태가 아닌지 확인 (주로 HTML <button disabled> 속성)
        return button.offsetParent !== null && !button.disabled;
    }

    // 일정 간격으로 버튼을 찾아서 클릭하는 주기적인 작업
    setInterval(function() 
    {
        const scrollToBottomBtn = findScrollButton();

        // 버튼이 존재하고, 화면에 보이며, 비활성화 상태가 아니라면 클릭
        if (checkButtonVisible(scrollToBottomBtn)) 
        {
            scrollToBottomBtn.click();
           // console.log('자동으로 "댓글 더보기" 버튼을 클릭하여 최신 채팅으로 스크롤했습니다.')
        }
        else 
        {
            //console.log('버튼이 보이지 않거나 비활성화되어 클릭하지 않음.')
        }
    }, FIND_INTERVAL);
})();