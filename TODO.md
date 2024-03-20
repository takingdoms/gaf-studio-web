- [ ] VirtualFrameData conversion: from Single to Multi and vice-versa
  - [ ] Button somewhere to convert the current frame to Single/Multi
        (maybe in the Menu Bar in the Frame topmenu)
    - [ ] When Single becomes Multi, the frameData is then copied as the first sublayer of the new
          multi-layered frame.
    - [ ] Multi->Single conversion is only enabled when there is exactly ONE sublayer.
          That one sublayer's frameData is copied as the frameData of the new single-layered frame.

- [ ] Button to create new Frame.
  - [ ] Big PLUS square tile at the end of the frame selection list (see manolo's image).
        Upon being clicked, two options are presented:
      - [ ] One: import image(s) from computer (this opens the existing file import wizard!) and
            ends up creating one or more single-layered frames.
      - [ ] Two: create multi-layered frame. This simply creates a multi-layered frame with empty
            sub-layers. The user will then be able to create sub-layers afterwards (see below).

- [ ] Button to create new Subframe.
  - [ ] Big PLUS square tile at the end of the subframe selection list (see manolo's image).
        Upon being clicked, opens the existing file import wizard! (for subframes)

- [ ] Buttons to delete Frames and Subframes.

- [ ] Button to replace the image data of the current frame (if it's a single-layered frame) or the
      current subframe. This opens the Import wizard that I already have.

- [ ] Image importing
  - [ ] TAF import wizard
  - [x] GAF import wizard

- [ ] Main Canvases controls
  - [ ] Buttons to toggle or configure grids, bounds, etc
  - [ ] Panning (middle mouse button or inputs near the other buttons)

- [ ] Other controls
  - [ ] Below each FrameSelectorItem add buttons to reorder the frames/subframes. Use
    arrow-bar-right or swipe-right from tabler-icons.

- [ ] Palette stuff
  - [ ] Palette selection wizard

- [ ] Result exporting (the end)
