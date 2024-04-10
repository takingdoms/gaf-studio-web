- [/] Button to create new Frame.
  - [x] Big PLUS square tile at the end of the frame selection list (see manolo's image).
        Upon being clicked, shows the importer wizard that already exists. This means that button
        only creates single-layered frames.
  - [ ] To create an empty multi-layered frame, the user needs to go to the top menu "Tools" >
        "Create empty multi-layered frame"

- [x] Button to create new Subframe.
  - [x] Big PLUS square tile at the end of the subframe selection list (see manolo's image).
        Upon being clicked, opens the existing file import wizard! (for subframes)
    - [x] If it's clicked on a Frame that is multi-layered, simply imports the images as subframes.
    - [x] If it's clicked on a Frame that is single-layered, the frame is automatically converted
          to a multi-layered frame, where the existing data is copied as the first sub-frame and
          the imported images become the subsequent frames.

- [x] VirtualFrameData conversion: from Single to Multi and vice-versa
  - [x] Button somewhere to convert the current frame to Single/Multi
        (maybe in the Menu Bar in the Frame topmenu)
    - [x] When Single becomes Multi, the frameData is then copied as the first sublayer of the new
          multi-layered frame.
    - [x] Multi->Single conversion is only enabled when there is exactly ONE sublayer.
          That one sublayer's frameData is copied as the frameData of the new single-layered frame.

- [x] Buttons to delete Frames and Subframes.

- [x] Image importing
  - [x] TAF import wizard
  - [x] GAF import wizard

- [x] Button to replace the image data of the current frame (if it's a single-layered frame) or the
      current subframe. This opens the Import wizard that I already have.

- [ ] Main Canvases controls
  - [x] Buttons to toggle or configure grids, bounds, etc
  - [ ] Panning (middle mouse button or inputs near the other buttons)

- [ ] Other controls
  - [ ] Below each FrameSelectorItem add buttons to reorder the frames/subframes. Use
    arrow-bar-right or swipe-right from tabler-icons.

- [ ] Palette stuff
  - [ ] Palette selection wizard

- [x] Result exporting (the end)

- [ ] New Pos column in the entries table

- [ ] Frame, subframe, sequence image exporting
      - [ ] Frame/subframe exporting can go into a button near the Options button atop the canvas

- [ ] Animation preview modal

- [?] QOL
  - [x] Upon creating a new Frame/Subframe automatically scroll into view of it
  - [ ] Hitting Enter on number prompts should fire the submit event of its surrounding "form"
  - [ ] Pre-load all image background resources before the app starts. VERY IMPORTANT!!
  - [ ] Put all "maxWidth: 600" and such that proliferate modal components into a variable
        inside constants.ts
  - [ ] Limit Int value for frame data offsets Inputs
