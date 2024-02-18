import { FileMapLabel } from "@/lib/file-map/file-map";

export const FILE_MAP_VIEWER_COLORS: Record<FileMapLabel, string> = {
  'header': 'bg-blue-800 border-blue-600',
  'entry_pointer': 'bg-yellow-800 border-yellow-600',
  'entry': 'bg-orange-800 border-orange-600',
  'frame': 'bg-cyan-800 border-cyan-600',
  'frame_data': 'bg-emerald-800 border-emerald-600',
  'sub_frame_data_pointer': 'bg-teal-800 border-teal-600',
  'uncompressed_palette_indices': 'bg-purple-800 border-purple-600',
  'compressed_palette_indices': 'bg-purple-800 border-purple-600',
  'raw_colors': 'bg-purple-800 border-purple-600',
  'unknown-gap': 'bg-slate-600 border-slate-400',
};
