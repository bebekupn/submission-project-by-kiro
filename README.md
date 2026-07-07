# 💰 Expense & Budget Visualizer

A modern, mobile-friendly web app for tracking daily spending with visual charts and category-based analytics.

## ✨ Features

### Core Features
- **📝 Transaction Form** - Add expenses with item name, amount, and category
- **📊 Transaction List** - View all expenses with edit and delete capabilities
- **💵 Total Balance** - Real-time balance display at the top
- **📈 Visual Chart** - Pie chart showing spending distribution by category
- **💾 Data Persistence** - All data saved to browser's LocalStorage

### Optional Challenges (Implemented)
- **🏷️ Custom Categories** - Add custom expense categories beyond the default options
- **🌙 Dark/Light Mode** - Toggle between themes with persistent preference
- **📑 Sort Transactions** - Sort by date, amount, or category

## 🚀 Quick Start

1. **Open the app**: Simply open `index.html` in your web browser
2. **Add transactions**: Fill in the form with item name, amount, and category
3. **View analytics**: Check the pie chart for spending breakdown
4. **Manage data**: Transactions are automatically saved to your browser

No installation, build process, or backend server required!

## 🛠️ Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Responsive styling with custom properties
- **Vanilla JavaScript** - No frameworks or dependencies
- **Chart.js** - Interactive pie chart visualization
- **LocalStorage API** - Client-side data persistence

## 📁 Project Structure

```
project/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling (responsive + dark mode)
├── js/
│   └── app.js             # Complete application logic
├── README.md              # This file
├── VERIFICATION.md        # Feature checklist
└── TEST_RESULTS.md        # Test verification report
```

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (<768px)

Works perfectly on all modern devices!

## 🌐 Browser Support

- ✅ Chrome
- ✅ Firefox
- ✅ Edge
- ✅ Safari

## 💡 How to Use

### Adding a Transaction
1. Enter the item name (e.g., "Lunch")
2. Enter the amount (e.g., "15.50")
3. Select a category or create a custom one
4. Click "Add Transaction"

### Managing Categories
- Use default categories: **Food**, **Transport**, **Fun**
- Add custom categories using the input field below the category dropdown
- Press Enter or click "Add" to create a new category

### Viewing Analytics
- The **pie chart** updates automatically as you add/delete transactions
- Shows spending distribution and percentages
- **Total Balance** displays at the top

### Switching Themes
- Click the **🌙 / ☀️** button in the header to toggle dark mode
- Your preference is saved automatically

### Sorting Transactions
- Use the **Sort by** dropdown to organize transactions:
  - Date (most recent first)
  - Amount (high to low or low to high)
  - Category (alphabetical)

## 💾 Data Storage

All data is stored locally in your browser using the **LocalStorage API**. This means:
- ✅ Your data persists between sessions
- ✅ No account creation needed
- ✅ Completely private - data never leaves your browser
- ⚠️ Clearing browser cache will delete your data

## 🎨 Features Highlight

### Form Validation
- All fields are required
- Amount must be a valid number
- Category must be selected

### Visual Design
- Clean, modern interface
- Clear visual hierarchy
- Smooth transitions and hover effects
- Color-coded transaction categories

### Performance
- Fast load time
- Responsive interactions
- Efficient DOM updates
- No lag when updating data

## 🔒 Security

- XSS protection through HTML escaping
- No dangerous functions or eval()
- Safe DOM manipulation
- Client-side validation only

## 📊 Example Usage

1. Open the app
2. Add some transactions:
   - "Breakfast" - $8.50 - Food
   - "Taxi" - $12.00 - Transport
   - "Movie" - $15.00 - Fun
3. Watch the chart update in real-time
4. See your total balance: $35.50
5. Sort, delete, or add more transactions

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings
3. Enable GitHub Pages from main branch
4. Your app is live!

### Other Hosting
- Upload all files to any web server
- No build process needed
- Works with any static hosting service

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | HTML structure with form, list, and chart containers |
| `css/style.css` | All styling, responsive design, dark mode |
| `js/app.js` | Application logic, state management, event handlers |
| `VERIFICATION.md` | Detailed feature verification checklist |
| `TEST_RESULTS.md` | Comprehensive test results and validation |

## ✅ Testing

All features have been tested and verified:
- ✅ Form validation
- ✅ Data persistence
- ✅ Chart updates
- ✅ Dark mode toggle
- ✅ Custom categories
- ✅ Transaction sorting
- ✅ Mobile responsiveness
- ✅ Cross-browser compatibility

See `TEST_RESULTS.md` for detailed test results.

## 📖 Documentation

- **VERIFICATION.md** - Complete feature checklist and requirements verification
- **TEST_RESULTS.md** - Comprehensive testing and validation report

## 💬 Tips & Tricks

- **Quick add**: Press Enter in the custom category field to add a category
- **Dark mode**: Your theme preference is saved automatically
- **Mobile friendly**: All buttons are touch-friendly and sized appropriately
- **Keyboard navigation**: Use Tab to navigate form fields
- **Data backup**: Consider exporting your data periodically

## 🐛 Known Limitations

- Data is stored locally in the browser (not synced across devices)
- Clearing browser cache will delete all data
- Maximum storage depends on browser settings (usually 5-10MB)

## 🎯 Future Enhancements

Possible additions:
- Monthly budget limits and alerts
- Data export/import functionality
- Recurring transactions
- Transaction notes and tags
- Multi-currency support

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

Built with Kiro AI Development Agent  
Version: 1.0.0  
Created: July 7, 2026

---

**Ready to track your expenses? [Open the app now!](./index.html)**

For more information, see the project files or documentation included.
