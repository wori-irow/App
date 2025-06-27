const items = [
    { name: '철거', price: 30000 },
    { name: '목공', price: 50000 },
    { name: '도배', price: 20000 },
    { name: '샷시', price: 70000 },
    { name: '전기', price: 60000 },
    { name: '조명', price: 15000 },
    { name: '몰딩', price: 8000 },
    { name: '바닥재', price: 25000 },
    { name: '문교체', price: 100000 },
    { name: '욕실', price: 80000 },
    { name: '에어컨', price: 40000 },
    { name: '설비', price: 90000 },
];

function calculateTotal() {
    const pyeongInput = document.getElementById('pyeong');
    const totalCostElement = document.getElementById('total-cost');
    const pyeong = parseInt(pyeongInput.value) || 0;

    const total = items.reduce((acc, item) => acc + item.price, 0) * pyeong;
    totalCostElement.textContent = `총 견적: ${total.toLocaleString()} 원`;
}

function loadItems() {
    const itemList = document.getElementById('item-list');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.price.toLocaleString()} 원`;
        itemList.appendChild(li);
    });
}

document.getElementById('pyeong').addEventListener('input', calculateTotal);

// 페이지 로드 시 항목과 총액 초기화
loadItems();
calculateTotal();
