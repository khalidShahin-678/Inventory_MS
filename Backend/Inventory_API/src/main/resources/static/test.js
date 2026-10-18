const items = [
    { name: "Bi-alcofan 30 tabs", qty: 6, unit: "اقراص" },
    { name: "Coloverin D tabs", qty: 5, unit: "اقراص" },
    { name: "Congestal tabs", qty: 3, unit: "اقراص" },
    { name: "Panadol advance 48 tabs", qty: 1, unit: "اقراص" },
    { name: "apidone syrup", qty: 11, unit: "عام" },
    // { name: "البيوستكس اقراص", qty: 58, unit: "عام" }
];

function formatForWhatsApp(data) {
    // Find the longest name length to set a dynamic column width
    const maxNameLength = Math.max(...data.map(item => item.name.length)) + 6;

    // Build the rows with fixed-width padding
    const rows = data.map(item => {
        const nameCol = item.name.padEnd(maxNameLength, ' ');
        const qtyCol = String(item.qty).padEnd(4, ' ');
        return `${nameCol}${qtyCol}${item.unit}`;
    });

    // Wrap everything inside WhatsApp's triple backtick monospace syntax
    return `\`\`\`\n${rows.join('\n')}\n\`\`\``;
}

console.log(formatForWhatsApp(items));