# Open Scope Features

I implemented the following open-scope features:

1. Filtering
2. Monthly Stats Header


## Why I Chose These Features

I chose filtering because it directly improves how hotel staff can analyze occupancy patterns based on room type, booking source, or booking status.

I added monthly stats to make the dashboard more operationally useful by surfacing revenue and occupancy insights at a glance.


## Trade-offs

Due to time constraints, I prioritized correctness of date logic and occupancy calculations over advanced visual polish and mobile responsiveness.

I also chose to use the native JavaScript Date API instead of external calendar libraries to maintain control over the booking overlap logic and better align with assignment requirements.



## What I Would Improve With More Time
- Add hover preview tooltip
- Add keyboard navigation support
- Add virtualization for large booking datasets
- Improve responsive design


## Key Engineering Focus

The primary engineering focus of this project was correctness of booking overlap calculations, occupancy derivation, and drag-selection behavior across month boundaries.
