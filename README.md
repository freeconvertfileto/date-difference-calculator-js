# Date Difference Calculator

Calculate the exact difference between two dates in years, months, days, weeks, hours, and minutes, with a swap button for reversed comparison, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/calculators/date-difference-calculator-online

## How It Works

`parseLocalDate(str)` constructs dates via `new Date(year, month-1, day)` to avoid UTC/timezone offset issues that arise when parsing ISO strings directly. The difference is computed by iterating: years are counted by advancing the start year until the result would overshoot, then months with the same borrow logic, then the remaining days are the raw difference. Total days is `Math.round((d2 - d1) / 86400000)`, total weeks is `Math.floor(totalDays / 7)`, and total hours/minutes are derived from the millisecond delta. A swap button exchanges the two date inputs and recalculates, so either direction can be studied without re-entering dates.

## Features

- Avoids UTC offset bugs via `new Date(y, m-1, d)` local date construction
- Difference decomposed into years, months, days
- Total days, total weeks, total hours, total minutes
- Swap button to reverse start and end dates
- Handles dates in either chronological order

## Browser APIs Used

- Date API (`new Date` with year/month/day constructor)

## Code Structure

| File | Description |
|------|-------------|
| `date-difference-calculator.js` | `parseLocalDate` (timezone-safe constructor), years/months/days borrow loop, total days/weeks/hours/minutes, swap button handler |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#ddcStart` | Start date input |
| `#ddcEnd` | End date input |
| `#ddcCalc` | Calculate button |
| `#ddcSwap` | Swap start and end dates |
| `#ddcYears`, `#ddcMonths`, `#ddcDays` | Decomposed difference |
| `#ddcTotalDays`, `#ddcTotalWeeks` | Total duration fields |
| `#ddcTotalHours`, `#ddcTotalMinutes` | Extended duration fields |

## License

MIT
