
// 기본 단가 설정
let prices = {
    // 평당 계산 항목
    demolition: 50000,      // 철거
    carpentry: 200000,      // 목공
    electrical: 80000,      // 전기공사
    
    // 고정 금액 항목
    wallpaper: 1500000,     // 도배
    window: 2000000,        // 샷시
    lighting: 800000,       // 조명
    molding: 600000,        // 몰딩
    flooring: 3000000,      // 바닥재
    door: 1200000,          // 문교체
    bathroom: 5000000,      // 욕실
    aircon: 2500000,        // 에어컨
    plumbing: 1800000,      // 설비
    
    // 일당 계산 항목
    island: 300000,         // 섬공사
    
    // 기본 인건비
    labor: 150000           // 기본 인건비
};

// DOM 요소들
const elements = {
    // 메인 페이지
    calculatorPage: document.getElementById('calculatorPage'),
    adminPage: document.getElementById('adminPage'),
    adminLogin: document.getElementById('adminLogin'),
    adminPanel: document.getElementById('adminPanel'),
    
    // 버튼들
    adminBtn: document.getElementById('adminBtn'),
    loginBtn: document.getElementById('loginBtn'),
    backBtn: document.getElementById('backBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    savePricesBtn: document.getElementById('savePricesBtn'),
    
    // 입력 필드들
    totalArea: document.getElementById('totalArea'),
    workDuration: document.getElementById('workDuration'),
    adminId: document.getElementById('adminId'),
    adminPassword: document.getElementById('adminPassword'),
    
    // 견적 표시
    itemsTotal: document.getElementById('itemsTotal'),
    laborTotal: document.getElementById('laborTotal'),
    grandTotal: document.getElementById('grandTotal')
};

// 로컬 스토리지에서 단가 불러오기
function loadPrices() {
    const savedPrices = localStorage.getItem('interiorPrices');
    if (savedPrices) {
        prices = { ...prices, ...JSON.parse(savedPrices) };
    }
    updatePriceDisplay();
    updateAdminInputs();
}

// 단가 표시 업데이트
function updatePriceDisplay() {
    // 평당 계산 항목
    document.querySelector('[data-item="demolition"]').textContent = `${formatNumber(prices.demolition)}원/평`;
    document.querySelector('[data-item="carpentry"]').textContent = `${formatNumber(prices.carpentry)}원/평`;
    document.querySelector('[data-item="electrical"]').textContent = `${formatNumber(prices.electrical)}원/평`;
    
    // 고정 금액 항목
    document.querySelector('[data-item="wallpaper"]').textContent = `${formatNumber(prices.wallpaper)}원`;
    document.querySelector('[data-item="window"]').textContent = `${formatNumber(prices.window)}원`;
    document.querySelector('[data-item="lighting"]').textContent = `${formatNumber(prices.lighting)}원`;
    document.querySelector('[data-item="molding"]').textContent = `${formatNumber(prices.molding)}원`;
    document.querySelector('[data-item="flooring"]').textContent = `${formatNumber(prices.flooring)}원`;
    document.querySelector('[data-item="door"]').textContent = `${formatNumber(prices.door)}원`;
    document.querySelector('[data-item="bathroom"]').textContent = `${formatNumber(prices.bathroom)}원`;
    document.querySelector('[data-item="aircon"]').textContent = `${formatNumber(prices.aircon)}원`;
    document.querySelector('[data-item="plumbing"]').textContent = `${formatNumber(prices.plumbing)}원`;
    
    // 일당 계산 항목
    document.querySelector('[data-item="island"]').textContent = `${formatNumber(prices.island)}원/일`;
    
    // 기본 인건비
    document.querySelector('[data-item="labor"]').textContent = `${formatNumber(prices.labor)}원/일`;
}

// 관리자 입력 필드 업데이트
function updateAdminInputs() {
    Object.keys(prices).forEach(key => {
        const input = document.getElementById(`admin-${key}`);
        if (input) {
            input.value = prices[key];
        }
    });
}

// 숫자 포맷팅 (천 단위 콤마)
function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

// 견적 계산
function calculateEstimate() {
    const area = parseFloat(elements.totalArea.value) || 0;
    const duration = parseInt(elements.workDuration.value) || 0;
    
    let itemsTotal = 0;
    
    // 체크된 항목들 계산
    const checkboxes = document.querySelectorAll('.item-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const itemId = checkbox.id;
        
        if (checkbox.classList.contains('per-area')) {
            // 평당 계산 항목
            itemsTotal += prices[itemId] * area;
        } else if (checkbox.classList.contains('per-day')) {
            // 일당 계산 항목
            itemsTotal += prices[itemId] * duration;
        } else if (checkbox.classList.contains('fixed-price')) {
            // 고정 금액 항목
            itemsTotal += prices[itemId];
        }
    });
    
    // 기본 인건비 계산 (항상 적용)
    const laborTotal = prices.labor * duration;
    
    // 총 견적
    const grandTotal = itemsTotal + laborTotal;
    
    // 화면에 표시
    elements.itemsTotal.textContent = `${formatNumber(itemsTotal)}원`;
    elements.laborTotal.textContent = `${formatNumber(laborTotal)}원`;
    elements.grandTotal.textContent = `${formatNumber(grandTotal)}원`;
}

// 이벤트 리스너들
document.addEventListener('DOMContentLoaded', function() {
    // 초기 데이터 로드
    loadPrices();
    
    // 관리자 모드 버튼
    elements.adminBtn.addEventListener('click', function() {
        elements.calculatorPage.classList.add('hidden');
        elements.adminPage.classList.remove('hidden');
        elements.adminLogin.classList.remove('hidden');
        elements.adminPanel.classList.add('hidden');
    });
    
    // 로그인 버튼
    elements.loginBtn.addEventListener('click', function() {
        const id = elements.adminId.value;
        const password = elements.adminPassword.value;
        
        if (id === 'admin' && password === '1234') {
            elements.adminLogin.classList.add('hidden');
            elements.adminPanel.classList.remove('hidden');
            updateAdminInputs();
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
        
        // 입력 필드 초기화
        elements.adminId.value = '';
        elements.adminPassword.value = '';
    });
    
    // 돌아가기 버튼
    elements.backBtn.addEventListener('click', function() {
        elements.adminPage.classList.add('hidden');
        elements.calculatorPage.classList.remove('hidden');
    });
    
    // 로그아웃 버튼
    elements.logoutBtn.addEventListener('click', function() {
        elements.adminPanel.classList.add('hidden');
        elements.adminLogin.classList.remove('hidden');
    });
    
    // 단가 저장 버튼
    elements.savePricesBtn.addEventListener('click', function() {
        const newPrices = {};
        
        Object.keys(prices).forEach(key => {
            const input = document.getElementById(`admin-${key}`);
            if (input) {
                newPrices[key] = parseInt(input.value) || 0;
            }
        });
        
        prices = { ...prices, ...newPrices };
        localStorage.setItem('interiorPrices', JSON.stringify(prices));
        
        updatePriceDisplay();
        alert('단가가 성공적으로 저장되었습니다.');
    });
    
    // 면적, 기간 입력 시 실시간 계산
    elements.totalArea.addEventListener('input', calculateEstimate);
    elements.workDuration.addEventListener('input', calculateEstimate);
    
    // 체크박스 변경 시 실시간 계산
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculateEstimate);
    });
    
    // Enter 키로 로그인
    elements.adminPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            elements.loginBtn.click();
        }
    });
    
    // 초기 계산
    calculateEstimate();
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
