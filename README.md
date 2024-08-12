# Softaware Heroboard

The Heroboard is built with [Next.js 14](https://nextjs.org/).

## Getting Started

```bash
# Run the development server:
npm run dev
```

## Update Data

To update the data, you can change the file in the following path: `public\data\data.json`. The URL can be changed by updating `DATA_URL` in `app\lib\constants.ts`.

The data is structured as follows:

```json
"id": 1,
"hero": {
    "name": "Max Mustermann",
    "video": "/videos/foreground-video.webm"
},
"achievement": {
    "title": "Frühster Vogel des Monats",
    "video": "/videos/stock/achievement-background.mp4",
    "details": {
    "title": "Frühste Zeitbuchung: 06:00 Uhr"
    }
}
```

## Video Formats

- The video format for the hero has to be a `.webm` file with encoded alpha channel.
- The video format for the achievement can be any video file type, however `.mp4` or `.webm` is recommended.

## Component Structure

The project is structured as follows:

```text
app/page.tsx
└── HeroPresentation -> maps the hero data
    └── HeroSlideContainer
        ├── HeroSlide
        └── SlideUpDescription


```
