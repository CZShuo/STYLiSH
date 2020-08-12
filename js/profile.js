const renderProfile = () => {
    if(localStorage.getItem('profile')){
        let profile = JSON.parse(localStorage.getItem('profile'));
        let divPro = document.getElementById('profile');
        
        let divA = document.createElement('div');
        divA.id = 'picture';
        let pic = `https://graph.facebook.com/${profile.id}/picture?width=500&height=500`;
        divA.style.backgroundImage = `url(${pic})`;
        divPro.appendChild(divA);
        divA = document.createElement('div');
        divA.id = 'name';
        divA.textContent = profile.name;
        divPro.appendChild(divA);
        divA = document.createElement('div');
        divA.id = 'email';
        divA.textContent = profile.email;
        divPro.appendChild(divA);
        
        let logout = document.getElementById('fblogin-text');
        logout.textContent = '登出';
        memberOnload();
    }else{
        let divPro = document.getElementById('profile');
        divPro.innerHTML = '';
        let logout = document.getElementById('fblogin-text');
        logout.textContent = '以 Facebook 帳號繼續';
        memberOnload();
    }
}