// ============================================
// EXPENSE & BUDGET VISUALIZER
// ============================================

// ============================================
// 1. STATE & CONFIGURATION
// ============================================

const CONFIG = {
    STORAGE_KEY: 'expense_tracker_data',
    DEFAULT_CATEGORIES: ['Food', 'Transport', 'Fun'],
    COLORS: {
        Food: '#f97316',
        Transport: '#3b82f6',
        Fun: '#ec4899',
    },
};

let appState = {
    transactions: [],
    categories: [...CONFIG.DEFAULT_CATEGORIES],
    darkMode: false,
    sortBy: 'date',
    chart: null,
};

// ============================================
// 2. STORAGE MANAGEMENT
// ============================================

function saveToStorage() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
        transactions: appState.transactions,
        categories: appState.categories,
        darkMode: appState.darkMode,
    }));
}

function loadFromStorage() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (stored) {
        const data = JSON.parse(stored);
        appState.transactions = data.transactions || [];
        appState.categories = data.categories || [...CONFIG.DEFAULT_CATEGORIES];
        appState.darkMode = data.darkMode || false;
    }
}

// ============================================
// 3. TRANSACTION MANAGEMENT
// ============================================

function addTransaction(name, amount, category) {
    const transaction = {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
    };
    
    appState.transactions.push(transaction);
    saveToStorage();
    return transaction;
}

function deleteTransaction(id) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    saveToStorage();
}

function getTotalBalance() {
    return appState.transactions.reduce((sum, t) => sum + t.amount, 0);
}

function getTransactionsByCategory() {
    const grouped = {};
    appState.transactions.forEach(t => {
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });
    return grouped;
}

function getSortedTransactions() {
    const sorted = [...appState.transactions];
    
    switch (appState.sortBy) {
        case 'amount-desc':
            sorted.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            sorted.sort((a, b) => a.amount - b.amount);
            break;
        case 'category':
            sorted.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'date':
        default:
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    return sorted;
}

// ============================================
// 4. CATEGORY MANAGEMENT
// ============================================

function addCustomCategory(categoryName) {
    const cleanName = categoryName.trim();
    if (cleanName && !appState.categories.includes(cleanName)) {
        appState.categories.push(cleanName);
        saveToStorage();
        updateCategorySelect();
        return true;
    }
    return false;
}

function updateCategorySelect() {
    const categorySelect = document.getElementById('category');
    const currentValue = categorySelect.value;
    
    categorySelect.innerHTML = '<option value="">Select a category</option>';
    
    appState.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
    
    categorySelect.value = currentValue;
}

// ============================================
// 5. UI RENDERING
// ============================================

function renderBalance() {
    const balance = getTotalBalance();
    const balanceEl = document.getElementById('totalBalance');
    balanceEl.textContent = `$${balance.toFixed(2)}`;
    balanceEl.style.color = balance > 0 ? '#10b981' : '#ef4444';
}

function renderTransactionList() {
    const listEl = document.getElementById('transactionList');
    const transactions = getSortedTransactions();
    
    if (transactions.length === 0) {
        listEl.innerHTML = '<p class="empty-state">No transactions yet. Add one above!</p>';
        return;
    }
    
    listEl.innerHTML = transactions.map(t => {
        const categoryLower = t.category.toLowerCase();
        const date = new Date(t.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        return `
            <div class="transaction-item ${categoryLower}">
                <div class="transaction-info">
                    <div class="transaction-name">${escapeHtml(t.name)}</div>
                    <div class="transaction-category">${t.category} • ${dateStr}</div>
                </div>
                <div class="transaction-amount">$${t.amount.toFixed(2)}</div>
                <button class="btn-delete" onclick="handleDeleteTransaction(${t.id})">Delete</button>
            </div>
        `;
    }).join('');
}

function renderChart() {
    const ctx = document.getElementById('spendingChart').getContext('2d');
    const data = getTransactionsByCategory();
    const labels = Object.keys(data);
    const amounts = Object.values(data);
    
    // Generate colors
    const colors = labels.map(label => CONFIG.COLORS[label] || generateRandomColor());
    
    // Destroy existing chart
    if (appState.chart) {
        appState.chart.destroy();
    }
    
    // Create new chart
    appState.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: colors,
                borderColor: getComputedStyle(document.body).getPropertyValue('--bg-primary'),
                borderWidth: 2,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `$${value.toFixed(2)} (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });
    
    renderChartLegend(labels, amounts, colors);
}

function renderChartLegend(labels, amounts, colors) {
    const legendEl = document.getElementById('chartLegend');
    const total = amounts.reduce((a, b) => a + b, 0);
    
    legendEl.innerHTML = labels.map((label, idx) => {
        const amount = amounts[idx];
        const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : '0';
        
        return `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${colors[idx]}"></div>
                <div>
                    <div style="font-weight: 600;">${label}</div>
                    <div style="font-size: 0.8rem; opacity: 0.7;">$${amount.toFixed(2)} (${percentage}%)</div>
                </div>
            </div>
        `;
    }).join('');
}

function updateUI() {
    renderBalance();
    renderTransactionList();
    if (appState.transactions.length > 0) {
        renderChart();
    } else {
        renderEmptyChart();
    }
}

function renderEmptyChart() {
    const canvas = document.getElementById('spendingChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (appState.chart) {
        appState.chart.destroy();
        appState.chart = null;
    }
    
    document.getElementById('chartLegend').innerHTML = '';
}

// ============================================
// 6. FORM HANDLING
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const category = document.getElementById('category').value.trim();
    
    // Validation
    if (!itemName) {
        showNotification('Please enter an item name', 'error');
        return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (!category) {
        showNotification('Please select a category', 'error');
        return;
    }
    
    // Add transaction
    addTransaction(itemName, amount, category);
    
    // Reset form
    document.getElementById('transactionForm').reset();
    document.getElementById('itemName').focus();
    
    // Update UI
    updateUI();
    showNotification('Transaction added successfully', 'success');
}

function handleAddCustomCategory() {
    const input = document.getElementById('customCategory');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        showNotification('Please enter a category name', 'error');
        return;
    }
    
    if (appState.categories.includes(categoryName)) {
        showNotification('This category already exists', 'error');
        return;
    }
    
    if (addCustomCategory(categoryName)) {
        input.value = '';
        showNotification(`Category "${categoryName}" added`, 'success');
    }
}

function handleDeleteTransaction(id) {
    if (confirm('Delete this transaction?')) {
        deleteTransaction(id);
        updateUI();
        showNotification('Transaction deleted', 'success');
    }
}

function handleSortChange(e) {
    appState.sortBy = e.target.value;
    renderTransactionList();
}

// ============================================
// 7. DARK MODE TOGGLE
// ============================================

function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    document.body.classList.toggle('dark-mode', appState.darkMode);
    
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = appState.darkMode ? '☀️' : '🌙';
    
    saveToStorage();
    
    // Re-render chart with new theme colors
    if (appState.transactions.length > 0) {
        renderChart();
    }
}

// ============================================
// 8. UTILITY FUNCTIONS
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateRandomColor() {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 50%)`;
}

function showNotification(message, type = 'info') {
    // Simple notification - can be enhanced with a toast library
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============================================
// 9. EVENT LISTENERS & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Load from storage
    loadFromStorage();
    
    // Apply dark mode if saved
    if (appState.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '☀️';
    }
    
    // Update category select with stored categories
    updateCategorySelect();
    
    // Attach event listeners
    document.getElementById('transactionForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('addCustomBtn').addEventListener('click', handleAddCustomCategory);
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('sortBy').addEventListener('change', handleSortChange);
    
    // Handle Enter key in custom category input
    document.getElementById('customCategory').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddCustomCategory();
        }
    });
    
    // Initial UI render
    updateUI();
    
    // Set focus to first input
    document.getElementById('itemName').focus();
});

// ============================================
// 10. DEMO DATA (Optional - for testing)
// ============================================

function loadDemoData() {
    appState.transactions = [
        { id: 1, name: 'Lunch at Italian Place', amount: 15.50, category: 'Food', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 2, name: 'Uber to Airport', amount: 32.00, category: 'Transport', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 3, name: 'Movie Tickets', amount: 28.00, category: 'Fun', date: new Date().toISOString() },
        { id: 4, name: 'Groceries', amount: 47.25, category: 'Food', date: new Date().toISOString() },
        { id: 5, name: 'Gas', amount: 52.00, category: 'Transport', date: new Date().toISOString() },
        { id: 6, name: 'Video Game', amount: 59.99, category: 'Fun', date: new Date().toISOString() },
    ];
    saveToStorage();
    updateUI();
}

// Uncomment to test with demo data:
// loadDemoData();
