# Product media and editorial record

## Source

The project owner supplied six product recording sets for this website. They were recorded November 11, 2026, with Dockingbird 0.15.37 and dockingbird-gui 0.1.20. The MP4 clips are included byte-for-byte. Most stills and posters are lossless WebP versions of the supplied PNGs; the status frame uses the original PNG embedded in an SVG viewport, as described below. No product text or status colors were reconstructed. The original archive and long source recordings are not republished here.

## Use and limitations

| Scene | Website use | Required context |
| --- | --- | --- |
| hero-coordination | Main workspace still, mobile coordinator crop, 24-second video | Sample shelf project; 5x recorded-video time-lapse. Three panes throughout; reviewer and tester are bus agents visible in the sidebar and reports. Not a speed benchmark. |
| agent-handoff | Builder-2 report crop and 14-second video | 3.5x time-lapse. The task explicitly asks the builders to agree on the interface; the visible report summarizes their messages. |
| configuration-patterns | Sample builder config, effective settings, untrusted-repository config list and 54-second video | Natural speed. Sample commands are not shipped presets. Video shows config; the GUI still shows a separately started coordinator. Agent files are not shown. |
| metrics-visibility | Agent status, Prometheus output, hero Swarm tab and 50-second video | Natural speed. Current sample process/thread, not a billing period. Claude bus agents report estimated cost and retries; Codex does not. Terminal agents expose context but not these model-usage series. Missing series are not zero. |
| fleet-placement | Before/after queue crops and 22-second video | 2.5x time-lapse; one demo worker host, placeholder sleep leases, memory hold. Idle-cores threshold lowered for the demo. No automatic host provisioning claim. |
| fleet-controls | Drain/undrain queue crops and 15-second video | 3x time-lapse. Drain blocks new work across the host's fleet projects and does not move or stop running work. Priority, pause and resume were not recorded. |

The source notes report dropped frames: GUI edits are about 7% faster than the source wall clock before their stated multiplier; fleet source is about 3% faster. Visible captions label the recording multiplier, and transcripts preserve coverage limitations. Videos load only after an explicit Watch action. Native playback controls and text transcripts are available in the media dialog. There is no autoplaying page animation.

## Feature verification

Copy was checked against the customer-facing Dockingbird SDK documentation:

- `README.md`: tools, platforms, containers, private workspaces and communication.
- `docs/concepts/swarms-and-roles.md`: role configuration and coordination.
- `docs/guides/your-own-commands.md`: instructions, skills, model settings, environment, trust and reusable commands.
- `docs/guides/metrics.md` and `docs/reference/metrics.md`: session windows and harness coverage.
- `docs/guides/fleet-scheduler.md`: reservation-based placement, hold reasons and host draining.

## Validation and previews

- `npm test`: 14 passing tests, including the waitlist backend, local media references, and the no-emoji rule.
- `node --check public/assets/site.js`, `npm run build`, and `git diff --check`: passing.
- Chrome: desktop review plus 320, 390 and 768-pixel iframe layouts; no horizontal overflow. Phone layout uses the supplied coordinator and swarm crops. Safari and Firefox were not run in this environment.
- All six clips reached playable state with their expected durations. Checked gallery keyboard selection, expanded captures, transcripts, Escape/close, focus restoration, and unloading video after close.
- Checked required-email validation and recovery from an unavailable waitlist endpoint. No live signup was submitted. D1 and Turnstile backend behavior remains covered by the existing tests.
- Main body text contrast is 6.54:1 on the page and 5.89:1 on the configuration background. Primary button text is 7.79:1. These measurements cover site typography, not text embedded in product captures.

[Complete desktop hero](previews/dockingbird-desktop-hero.jpg) · [Complete phone hero](previews/dockingbird-mobile.jpg) · [Expanded status capture](previews/dockingbird-status.jpg)

### Terminal framing correction

The gallery and expanded-media frames now provide a continuous border with an 8–14px inset. Images retain their own aspect ratio; fleet frames no longer impose a separate height. Updated hero previews include the entire product frame.

The supplied 1900 x 1210 status crop clipped the final question and prompt. `agent-status.svg` embeds the original `metrics-visibility-status-2x.png` byte-for-byte and uses a 2040 x 1280 viewport to include the complete output and surrounding black margin. It contains no reconstructed text.

The corrected layout was checked in Chrome at 320, 390, 768 and desktop iframe widths with no horizontal overflow. Every terminal frame retains space on all four sides; the restored status capture, gallery switching and expanded-media dialog were checked. Safari and Firefox were not available for this pass.

## Included files

All paths below are relative to `public/assets/media/`. Checksums identify the exact website assets.

| Website file | Dimensions | SHA-256 |
| --- | --- | --- |
| `workspace.webp` | 3840 x 2160 | `1e32c409a79f2bc0ee9c2fed26ea92d3407844ebfb61bb40ea9ed13b11220659` |
| `workspace-mobile.webp` | 1640 x 2040 | `d08064aa43adec85733240d7aee4469efaf8ec07b5691f6eee228a8d41e19a51` |
| `swarm.webp` | 3840 x 2160 | `7e8be970e45b13ed715ba4780d71fc1ce3b92a7952f677b96f8f3f70f05132ba` |
| `swarm-mobile.webp` | 2200 x 1070 | `6b7ba0170c09ef87086aa833647c9473e33fd726f66953410ce819259fca580f` |
| `handoff.webp` | 1610 x 1000 | `8b801010a9d969a95ea5ab09f2a2bdd2a4fd8b9d90d7c9cd0aadc827b434e314` |
| `configuration.webp` | 2817 x 1544 | `bab62127e6f8431dea5826a4799eafb249a888cf794397935f89c74c0f85f513` |
| `effective-settings.webp` | 3270 x 1580 | `7da764f9b83a8879639d042e7ca079c0d66bc94247a0705eab5e57e2952446a5` |
| `repository-trust.webp` | 2822 x 979 | `0b53d4d24935206f9aaa3a90251ecd6929d0c342bf641126bea259a95c5fb837` |
| `agent-status.svg` | 2040 x 1280 viewport | `325a9a7b3e81da447f34611380c06fffbe5bf1ffe0edb11474129b842715ba36` |
| `agent-metrics.webp` | 3140 x 680 | `ad5c6aa495bb24975d006221c1ed6cd5c54c36993eaeda338c28b2cbaca8b44e` |
| `fleet-pending.webp` | 2600 x 1010 | `9533b6b08f746c2fa897efc08cf4e9944e25656d27aa710fe3c7d05b851132d7` |
| `fleet-admitted.webp` | 2600 x 1010 | `d4c1729f7c477299461f1979e7854d46c0003eb0bbcf167aca9cdd4b444f9ef6` |
| `fleet-draining.webp` | 2600 x 1010 | `6e93e7b060040864a285dcc44905ccbfe8f92e27ca177501c8d837422c3d1258` |
| `fleet-active.webp` | 2600 x 1010 | `95dbc51d41fdd07a79c50a214044b6432103854193c9a3ed4645d46d8faf4a89` |
| `hero-coordination.mp4` | 1920 x 1080 | `2d1fafd6ecb978b110af0c0fe622c7388baea1afb89ed95fbad59d39d14c62ed` |
| `hero-coordination-poster.webp` | 1920 x 1080 | `7a2fc8e6b69c1d0a0dd74691db888e8de9dc4d49580b81aefca18444cc4df44c` |
| `agent-handoff.mp4` | 1920 x 1080 | `282d505cf1545fa7aac5827cd0f9cc0155771452d1b6f6c2aa1ccd373d564081` |
| `agent-handoff-poster.webp` | 1920 x 1080 | `845340e1ea312706680441d3b482d64d0e653b401f3e7c06268a8f391f15ba4f` |
| `configuration-patterns.mp4` | 1920 x 1080 | `d7621ad3158451d731de3e370dadda7700a92ce9604def65c3cfd2aa2da79318` |
| `configuration-patterns-poster.webp` | 1920 x 1080 | `b7c53d422ed44ba4e8a0ba940ec0067fefbb0df0c4c31bcc0da42db9844626a7` |
| `metrics-visibility.mp4` | 1920 x 1080 | `ecaa400a2ebe4e6f5926aa3573b68e2430fa7797d935a9244e1f63b5f443489d` |
| `metrics-visibility-poster.webp` | 1920 x 1080 | `9e5fb8d9f76e0bbbff8ab118bacd03dad0ef756c04af2b27927bb53cc5833328` |
| `fleet-placement.mp4` | 1920 x 1080 | `b4677438169bf6258aaf368b39c9bd96850f567354605145768c13ccf8b62aed` |
| `fleet-placement-poster.webp` | 1920 x 1080 | `8cfe1574bf9ddc6c19b8b1c3814a8dd4d4cd933e3bfb37b7cfc08b5cc71413d3` |
| `fleet-controls.mp4` | 1920 x 1080 | `0f678ab309f16cfdc571621031fdaf376177db086fe95069f33a6dcf1e862c1a` |
| `fleet-controls-poster.webp` | 1920 x 1080 | `c8d9d5e4fc2f854b22787aadc7459cee5e29cfdddff65eecfec6a43d599501e1` |
