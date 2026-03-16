(function() {
    function parseLocalDate(val) {
        if (!val) return null;
        var parts = val.split('-');
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }

    function calculate() {
        var fromVal = document.getElementById('ddFrom').value;
        var toVal = document.getElementById('ddTo').value;
        if (!fromVal || !toVal) { return; }

        var d1 = parseLocalDate(fromVal);
        var d2 = parseLocalDate(toVal);

        var earlier = d1 <= d2 ? d1 : d2;
        var later = d1 <= d2 ? d2 : d1;

        var years = later.getFullYear() - earlier.getFullYear();
        var months = later.getMonth() - earlier.getMonth();
        var days = later.getDate() - earlier.getDate();

        if (days < 0) {
            months -= 1;
            var prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        var totalMs = later - earlier;
        var totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
        var totalWeeks = Math.floor(totalDays / 7);
        var totalHours = totalDays * 24;

        document.getElementById('ddYears').textContent = years;
        document.getElementById('ddMonths').textContent = months;
        document.getElementById('ddDays').textContent = days;
        document.getElementById('ddTotalDays').textContent = totalDays.toLocaleString();
        document.getElementById('ddTotalWeeks').textContent = totalWeeks.toLocaleString();
        document.getElementById('ddTotalHours').textContent = totalHours.toLocaleString();

        var noteEl = document.getElementById('ddOrderNote');
        if (d1 > d2) {
            noteEl.textContent = 'Note: dates swapped for calculation (To is earlier than From)';
        } else {
            noteEl.textContent = '';
        }

        document.getElementById('ddResults').style.display = 'flex';
    }

    var calcBtn = document.getElementById('ddCalcBtn');
    var swapBtn = document.getElementById('ddSwap');

    if (calcBtn) { calcBtn.addEventListener('click', calculate); }

    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            var fromEl = document.getElementById('ddFrom');
            var toEl = document.getElementById('ddTo');
            var tmp = fromEl.value;
            fromEl.value = toEl.value;
            toEl.value = tmp;
            if (fromEl.value && toEl.value) { calculate(); }
        });
    }

    var fromEl = document.getElementById('ddFrom');
    var toEl = document.getElementById('ddTo');
    if (fromEl) { fromEl.addEventListener('change', function() { if (toEl.value) calculate(); }); }
    if (toEl) { toEl.addEventListener('change', function() { if (fromEl.value) calculate(); }); }
})();
