# 🎮 MnemoQuest - Future Games Implementation Plan

This document outlines planned mini-games for future phases of MnemoQuest development.

**Current Status**: Phase 1, 2, 4 & 5 Complete (11 games) ✅  
**Document Version**: 2.0  
**Last Updated**: November 2025  
🎮 **[Play Current Version →](https://kyroskoh.github.io/mnemoquest/)**

---

## 📊 Game Implementation Status

### ✅ Phase 1-2: Foundation (COMPLETE)
**3 Original Games:**
1. ✅ **Memory Grid** - Spatial recall  
2. ✅ **Sequence Sparks** - Working memory  
3. ✅ **Card Match** - Visual memory

### ✅ Phase 4: Core Expansion (COMPLETE - Q4 2025)
**4 New Games:**
4. ✅ **Number Recall** - Numerical memory  
5. ✅ **Flash Count** - Rapid attention  
6. ✅ **Word Trail** - Verbal memory  
7. ✅ **Pattern Path** - Spatial sequencing

### ✅ Phase 5: Advanced Training (COMPLETE - Q4 2025)
**4 New Games:**
8. ✅ **N-Back Challenge** - Working memory (gold standard)
9. ✅ **Story Recall** - Episodic memory
10. ✅ **Change Detection** - Visual working memory
11. ✅ **Color Sequence** - Color pattern memory

**Current Total: 11 Games**

---

## 🗓️ Future Implementation Roadmap

### Phase 6: Specialized Training (Q1 2026)
**Goal**: Real-world application games

### Phase 6: Real-World Applications (Q2 2026)
**Goal**: Practical memory skills

### Phase 7: Multi-Sensory (Q3 2026)
**Goal**: Audio and mixed-modality games

---

## 🎯 Phase 4: Core Expansion (Priority 1)

### 1. Word Trail 🔤
**Status**: Planned in PRD  
**Skill**: Verbal Memory & Sequential Recall  
**Implementation Difficulty**: ⭐⭐ (Easy)

**Description**:
- Words appear one-by-one on screen
- Player must recall them in correct order
- Tests verbal and sequential memory

**Gameplay**:
1. Show sequence of words (one at a time, 1-2 seconds each)
2. Words disappear
3. Player types or selects words in correct order
4. Score based on accuracy and order correctness

**Difficulty Scaling**:
| Difficulty | Word Count | Display Time | Complexity |
|-----------|-----------|--------------|------------|
| 1.0 | 3 words | 2 seconds | Simple (cat, dog, fish) |
| 5.0 | 7 words | 1.2 seconds | Medium (elephant, adventure, computer) |
| 10.0 | 15 words | 0.8 seconds | Complex + similar words |

**Technical Requirements**:
- Word database (categorized by difficulty)
- Timer system
- Input validation (spelling)
- Optional: Speech recognition API

**File Structure**:
```
src/games/WordTrailGame.ts
src/assets/wordlists/
  - easy.json
  - medium.json
  - hard.json
```

---

### 2. Pattern Path 🎨
**Status**: Planned in PRD  
**Skill**: Spatial Sequencing  
**Implementation Difficulty**: ⭐⭐⭐ (Medium)

**Description**:
- Path/trail appears briefly on grid
- Player must trace the same path
- Tests spatial memory and sequential processing

**Gameplay**:
1. Grid displays (5×5 to 10×10)
2. Path highlights in sequence (arrows or colored trail)
3. Path disappears
4. Player recreates path by clicking cells
5. Visual feedback (green = correct, red = wrong)

**Difficulty Scaling**:
| Difficulty | Grid Size | Path Length | Display Time |
|-----------|-----------|-------------|--------------|
| 1.0 | 5×5 | 4 steps | 3 seconds |
| 5.0 | 7×7 | 8 steps | 2 seconds |
| 10.0 | 10×10 | 15 steps | 1.2 seconds |

**Technical Requirements**:
- Grid rendering system (can reuse from Memory Grid)
- Path generation algorithm
- Path validation logic
- Visual trail effects

**Special Features**:
- Arrow indicators showing direction
- Optional: Diagonal movements (harder)
- Optional: Multiple paths (expert mode)

---

### 3. Number Recall 🔢
**Status**: New Addition - High Priority  
**Skill**: Short-term Numerical Memory  
**Implementation Difficulty**: ⭐ (Very Easy)

**Description**:
- Series of numbers flash on screen
- Player types them back
- Foundation for real-world skills (phone numbers, codes)

**Gameplay**:
1. Numbers appear one-by-one (1 second each)
2. All numbers disappear
3. Player types the sequence
4. Option: Forward or reverse order

**Difficulty Scaling**:
| Difficulty | Digit Count | Display Speed | Mode |
|-----------|-------------|---------------|------|
| 1.0 | 3 digits | 1.5 seconds | Forward |
| 3.0 | 5 digits | 1.2 seconds | Forward |
| 5.0 | 7 digits | 1 second | Forward |
| 7.0 | 9 digits | 0.8 seconds | Reverse option |
| 10.0 | 12 digits | 0.6 seconds | Reverse |

**Variants**:
- **Forward Recall** (easier)
- **Reverse Recall** (harder, tests working memory)
- **Odd/Even Only** (selective attention)

**Technical Requirements**:
- Number generator
- Input field with validation
- Comparison algorithm
- Optional: Number pad UI

**Real-World Application**:
- Phone numbers
- PIN codes
- Credit card numbers
- Addresses

---

### 4. Flash Count ⚡
**Status**: New Addition - Quick Rounds  
**Skill**: Subitizing & Rapid Attention  
**Implementation Difficulty**: ⭐⭐ (Easy)

**Description**:
- Objects flash briefly on screen
- Player must count specific items
- Fast-paced, attention training

**Gameplay**:
1. Random objects appear (shapes, colors, symbols)
2. Flash for 100-500ms
3. Question: "How many red circles?"
4. Player enters count
5. Instant feedback

**Difficulty Scaling**:
| Difficulty | Object Count | Display Time | Categories |
|-----------|-------------|--------------|------------|
| 1.0 | 3-5 objects | 500ms | 1 type |
| 5.0 | 8-12 objects | 300ms | 2-3 types |
| 10.0 | 15-20 objects | 150ms | 4+ types |

**Technical Requirements**:
- Canvas/SVG rendering for objects
- Random placement algorithm
- Timer system
- Score calculation

**Cognitive Benefits**:
- Subitizing (instant counting 1-4 items)
- Visual attention
- Processing speed

---

## 🧠 Phase 5: Advanced Training (Priority 2)

### 5. N-Back Challenge 🧮
**Status**: High Scientific Value  
**Skill**: Advanced Working Memory  
**Implementation Difficulty**: ⭐⭐⭐ (Medium)

**Description**:
- Gold standard working memory test
- Letters appear one at a time
- Player indicates when current matches N positions back
- **Scientifically proven** to improve fluid intelligence

**Gameplay**:
1. Letters appear sequentially (A, F, K, F, R...)
2. Player presses key when match occurs
3. Modes: 1-back, 2-back, 3-back

**Example (2-back)**:
```
Letters:  A  F  K  F  R  K  T
Position: 1  2  3  4  5  6  7
          
At position 4: F matches position 2? YES ✓
At position 6: K matches position 4? NO ✗
```

**Difficulty Scaling**:
| Difficulty | N-Back Level | Speed | Duration |
|-----------|--------------|-------|----------|
| 1.0 | 1-back | 3 seconds | 20 trials |
| 5.0 | 2-back | 2.5 seconds | 25 trials |
| 10.0 | 3-back | 2 seconds | 30 trials |

**Technical Requirements**:
- Sequence generator
- Keyboard input handling
- Real-time scoring
- Performance metrics (d-prime, hit rate, false alarms)

**Research Backing**:
- Jaeggi et al. (2008) - Transfer to fluid intelligence
- Most researched cognitive training paradigm
- Should track: accuracy, reaction time, d-prime

**Advanced Features**:
- Dual N-back (visual + auditory)
- Adaptive difficulty per session
- Performance graphing

---

### 6. Change Detection 🔍
**Status**: High Engagement Potential  
**Skill**: Visual Working Memory  
**Implementation Difficulty**: ⭐⭐⭐ (Medium)

**Description**:
- Scene appears, then reappears with ONE change
- Player identifies what changed
- Tests visual attention and memory

**Gameplay**:
1. Show scene (objects, shapes, colors)
2. Display for 2-3 seconds
3. Brief blank screen (500ms)
4. Scene reappears with ONE change
5. Player clicks what changed

**Change Types**:
- **Color change** (red circle → blue circle)
- **Position change** (object moved)
- **Size change** (object larger/smaller)
- **Disappearance** (object removed)
- **Appearance** (new object added)

**Difficulty Scaling**:
| Difficulty | Objects | Change Type | Viewing Time |
|-----------|---------|-------------|--------------|
| 1.0 | 3-4 | Color | 3 seconds |
| 5.0 | 6-8 | Color/Position | 2 seconds |
| 10.0 | 10-15 | Subtle changes | 1.5 seconds |

**Technical Requirements**:
- Scene generation engine
- Object manipulation
- Click detection
- Visual comparison

**Cognitive Benefits**:
- Visual working memory
- Change blindness training
- Attention to detail

---

### 7. Color Sequence 🌈
**Status**: Variation on Sequence Sparks  
**Skill**: Color Recognition & Memory  
**Implementation Difficulty**: ⭐⭐ (Easy)

**Description**:
- Cells flash different colors in sequence
- Player must click cells in COLOR order (not position order)
- Different from Sequence Sparks: focus on attribute memory

**Gameplay**:
1. Grid of cells (4×4)
2. Cells flash different colors in sequence
3. Player clicks cells in order of colors shown
4. Example: Red → Blue → Green → Yellow

**Difficulty Scaling**:
| Difficulty | Colors | Sequence Length | Speed |
|-----------|--------|-----------------|-------|
| 1.0 | 3 colors | 4 steps | Slow |
| 5.0 | 5 colors | 7 steps | Medium |
| 10.0 | 7 colors | 12 steps | Fast |

**Technical Requirements**:
- Color palette system
- Grid rendering (reuse Memory Grid code)
- Sequence tracking
- Color comparison

---

### 8. Story Recall 📚
**Status**: ✅ IMPLEMENTED  
**Skill**: Episodic Memory & Detail Retention  
**Implementation Difficulty**: ⭐⭐ (Easy - text based)

**Description**:
- Read short stories and answer detail-focused questions
- Tests episodic memory and narrative comprehension
- Fully translated content system (8 languages)

**Gameplay**:
1. Short story displays with countdown timer
2. Player reads and memorizes details
3. Story disappears after time limit
4. Multiple choice questions test recall
5. Questions focus on: who, what, where, when, colors, numbers

**Example Story (Easy)**:
```
"Maria drove her blue car to the market on Wednesday. 
She bought tomatoes and cheese. On the way home, 
she stopped at the library."

Questions:
- What color was Maria's car? (Blue/Red/Green)
- When did Maria go to the market? (Tuesday/Wednesday/Thursday)
- What did she buy? (Tomatoes & cheese / Apples & milk / etc.)
```

**Difficulty Scaling**:
| Difficulty | Story Length | Questions | Display Time |
|-----------|--------------|-----------|--------------|
| 1.0-3.0 | 2 sentences | 4 questions | 15 seconds |
| 4.0-7.0 | 4 sentences | 5 questions | 12 seconds |
| 8.0+ | 6 sentences | 6 questions | 10 seconds |

**Technical Implementation**:
- Dynamic story loading based on user language
- Story database: `src/data/storyRecall/[lang].ts`
- 5 stories per language (2 easy, 2 medium, 1 hard)
- 40 fully translated stories total (8 languages)
- Multiple choice question system
- Visual feedback on correct/incorrect answers

**Translation Coverage**:
- ✅ English, Spanish, Chinese, French
- ✅ German, Japanese, Korean, Portuguese
- 184 translated questions across all languages
- 736 translated answer options

**Cognitive Benefits**:
- Episodic memory formation
- Detail encoding and retrieval
- Active reading comprehension
- Real-world application: remembering conversations, meetings, instructions

---

## 🌍 Phase 6: Real-World Applications (Priority 3)

### 9. Shopping List 🛒
**Status**: Practical Application  
**Skill**: List Memory (Chunking Strategy)  
**Implementation Difficulty**: ⭐⭐ (Easy)

**Description**:
- Memorize shopping list
- Recall items by category or order
- Teaches chunking technique

**Gameplay**:
1. Show shopping list (5-15 items)
2. Items organized by category (Dairy, Produce, etc.)
3. List disappears
4. Player checks off remembered items
5. Bonus: Recall by category

**Difficulty Scaling**:
| Difficulty | Items | Categories | Display Time |
|-----------|-------|------------|--------------|
| 1.0 | 5 items | 2 categories | 30 seconds |
| 5.0 | 10 items | 4 categories | 20 seconds |
| 10.0 | 15 items | 5 categories | 15 seconds |

**Technical Requirements**:
- Item database with categories
- Checklist UI
- Category grouping logic

**Teaching Element**:
- Tips on chunking strategy
- "Group items by category to remember better!"
- Real-world applicable

**Item Categories**:
- Dairy (milk, cheese, yogurt)
- Produce (apples, lettuce, tomatoes)
- Meat (chicken, beef, fish)
- Bakery (bread, muffins, bagels)
- Pantry (rice, pasta, cereal)

---

### 10. Mental Math Sprint ➗
**Status**: Cognitive Challenge  
**Skill**: Working Memory + Calculation  
**Implementation Difficulty**: ⭐⭐ (Easy)

**Description**:
- Solve math problems rapidly
- Remember previous answers
- Final question tests memory: "What was the 2nd answer?"

**Gameplay**:
1. Show 3-5 math problems one at a time
2. Player solves each
3. After all problems: "What was answer #2?"
4. Tests working memory under cognitive load

**Difficulty Scaling**:
| Difficulty | Problems | Operations | Numbers |
|-----------|----------|------------|---------|
| 1.0 | 3 | Addition | 1-10 |
| 5.0 | 4 | +, - | 1-50 |
| 10.0 | 5 | +, -, ×, ÷ | 1-100 |

**Technical Requirements**:
- Math problem generator
- Answer validation
- Memory tracking
- Timer

**Cognitive Benefits**:
- Working memory under load
- Dual-task processing
- Mental calculation speed

---

### 11. Face Memory 👤
**Status**: Social Memory Training  
**Skill**: Face Recognition & Name Association  
**Implementation Difficulty**: ⭐⭐⭐⭐ (Hard - requires assets)

**Description**:
- Learn faces with names
- Later test: name recall or face recognition
- Practical for networking, social situations

**Gameplay**:
1. Show faces with names (study phase)
2. Test: Show face, ask "What's the name?"
3. OR: Show name, ask "Which face?"

**Difficulty Scaling**:
| Difficulty | Faces | Similarity | Study Time |
|-----------|-------|------------|------------|
| 1.0 | 3 faces | Distinct | 5 sec each |
| 5.0 | 6 faces | Similar | 3 sec each |
| 10.0 | 12 faces | Very similar | 2 sec each |

**Technical Requirements**:
- Avatar generation system (use API or library)
- Name database
- Face-name association logic

**Options for Faces**:
- Generated avatars (DiceBear API, Boring Avatars)
- AI-generated faces (ThisPersonDoesNotExist API)
- Illustrated characters

**Real-World Value**:
- Remember people at events
- Networking skills
- Professional meetings

---

### 12. Route Planner 🗺️
**Status**: Spatial Navigation  
**Skill**: Spatial Navigation Memory  
**Implementation Difficulty**: ⭐⭐⭐⭐ (Hard)

**Description**:
- Study route on map
- Recreate path from memory
- Navigation memory training

**Gameplay**:
1. Show map with highlighted route
2. Route disappears
3. Player recreates by clicking waypoints
4. Score based on accuracy

**Difficulty Scaling**:
| Difficulty | Waypoints | Map Size | Landmarks |
|-----------|-----------|----------|-----------|
| 1.0 | 4 turns | Small | Many |
| 5.0 | 7 turns | Medium | Some |
| 10.0 | 12 turns | Large | Few |

**Technical Requirements**:
- Map rendering (could use simplified grid-based map)
- Route drawing
- Path comparison algorithm

**Simplified Version**:
- Use abstract grid map (not real map)
- Color-coded landmarks
- Arrow-based direction system

---

## 🎵 Phase 7: Multi-Sensory Training (Priority 4)

### 13. Sound Sequence 🎵
**Status**: Auditory Memory  
**Skill**: Auditory Sequential Memory  
**Implementation Difficulty**: ⭐⭐⭐ (Medium - requires audio)

**Description**:
- Musical Simon - tones play in sequence
- Player repeats by clicking buttons
- Auditory version of Sequence Sparks

**Gameplay**:
1. Buttons represent different tones
2. Tones play in sequence
3. Player clicks to repeat
4. Like a digital xylophone

**Difficulty Scaling**:
| Difficulty | Tones | Sequence | Similarity |
|-----------|-------|----------|------------|
| 1.0 | 4 tones | 3 notes | Distinct |
| 5.0 | 6 tones | 6 notes | Similar |
| 10.0 | 8 tones | 10 notes | Very close |

**Technical Requirements**:
- Web Audio API or Howler.js
- Tone generation
- Sound files (piano notes, chimes, etc.)
- Sequence playback

**Tones to Use**:
- Piano notes (C, D, E, F, G, A, B, C)
- Different instruments
- Synthesized beeps (different frequencies)

---

### 14. Rhythm Recall 🥁
**Status**: Temporal Memory  
**Skill**: Temporal Pattern Recognition  
**Implementation Difficulty**: ⭐⭐⭐ (Medium)

**Description**:
- Rhythm pattern plays (tap pattern)
- Player taps it back
- Trains temporal memory

**Gameplay**:
1. Rhythm plays (visual + audio)
2. Player taps spacebar to recreate rhythm
3. Compare timing accuracy

**Example Patterns**:
```
Easy:    ♪  ♪  ♪  ♪  (even beats)
Medium:  ♪ ♪  ♪   ♪  (varied spacing)
Hard:    ♪♪ ♪  ♪ ♪♪  (syncopated)
```

**Difficulty Scaling**:
| Difficulty | Beats | Pattern | Tempo |
|-----------|-------|---------|-------|
| 1.0 | 4 beats | Simple | Slow |
| 5.0 | 8 beats | Complex | Medium |
| 10.0 | 12 beats | Syncopated | Fast |

**Technical Requirements**:
- Rhythm engine
- Tap detection with timing
- Visual metronome
- Timing comparison algorithm

---

### 15. Shape Rotation 🔄
**Status**: Spatial Reasoning  
**Skill**: Mental Rotation  
**Implementation Difficulty**: ⭐⭐⭐⭐ (Hard - 3D graphics)

**Description**:
- Show 3D shape briefly
- Show multiple rotated versions
- Player identifies same shape

**Gameplay**:
1. Target shape appears (2 seconds)
2. Show 4 options (rotated versions)
3. Player clicks matching shape
4. Only ONE is correct rotation

**Difficulty Scaling**:
| Difficulty | Shape Complexity | Rotation | Options |
|-----------|------------------|----------|---------|
| 1.0 | Simple (cube) | 90° | 2 options |
| 5.0 | Medium (L-shape) | 120° | 3 options |
| 10.0 | Complex | 45° | 4 options |

**Technical Requirements**:
- 3D rendering (Three.js or Canvas 2D isometric)
- Shape generation
- Rotation algorithms
- Visual comparison

**Simplified Version**:
- Use 2D shapes with rotation
- Isometric view instead of full 3D

---

### 16. Mirror Match 🪞
**Status**: Visual-Spatial Processing  
**Skill**: Mirror Image Recognition  
**Implementation Difficulty**: ⭐⭐⭐ (Medium)

**Description**:
- Pattern on left side
- Player recreates mirrored on right side
- Tests spatial transformation

**Gameplay**:
1. Grid split in half (left/right)
2. Pattern appears on left
3. Player clicks right side to mirror it
4. Visual feedback on correctness

**Difficulty Scaling**:
| Difficulty | Grid Size | Pattern Complexity | Time Limit |
|-----------|-----------|-------------------|------------|
| 1.0 | 3×3 | 3 cells | No limit |
| 5.0 | 5×5 | 7 cells | 30 seconds |
| 10.0 | 7×7 | 15 cells | 20 seconds |

**Technical Requirements**:
- Split grid rendering
- Mirror transformation logic
- Pattern generation
- Validation

---

## 📊 Priority Matrix

### ✅ Completed Games (Phase 4 & 5)

| Game | Cognitive Value | Implementation Ease | User Engagement | Real-World Use | **Status** |
|------|----------------|--------------------|-----------------| ---------------|------------|
| Number Recall | 4 | 5 | 3 | 5 | ✅ Complete |
| Flash Count | 3 | 5 | 4 | 3 | ✅ Complete |
| Word Trail | 4 | 5 | 4 | 4 | ✅ Complete |
| Pattern Path | 4 | 3 | 5 | 3 | ✅ Complete |
| N-Back | 5 | 3 | 3 | 4 | ✅ Complete |
| Story Recall | 4 | 4 | 4 | 4 | ✅ Complete |
| Change Detection | 4 | 3 | 5 | 3 | ✅ Complete |
| Color Sequence | 3 | 4 | 4 | 2 | ✅ Complete |

### 📋 Future Games Priority (Phase 6+)

| Game | Cognitive Value | Implementation Ease | User Engagement | Real-World Use | **Priority** |
|------|----------------|--------------------|-----------------| ---------------|--------------|
| Shopping List | 3 | 4 | 4 | 5 | ⭐⭐⭐⭐ |
| Mental Math | 3 | 4 | 3 | 4 | ⭐⭐⭐ |
| Face Memory | 5 | 2 | 5 | 5 | ⭐⭐⭐⭐ |
| Sound Sequence | 3 | 3 | 4 | 2 | ⭐⭐⭐ |
| Rhythm Recall | 3 | 3 | 3 | 2 | ⭐⭐⭐ |
| Route Planner | 4 | 2 | 3 | 4 | ⭐⭐⭐ |
| Shape Rotation | 4 | 2 | 3 | 3 | ⭐⭐⭐ |
| Mirror Match | 3 | 3 | 3 | 2 | ⭐⭐⭐ |

---

## 🛠️ Technical Implementation Notes

### Shared Components to Build

#### 1. Word Database System
```typescript
// src/data/WordDatabase.ts
export class WordDatabase {
  getWords(difficulty: number, count: number): string[]
  getWordsByCategory(category: string): string[]
}
```

#### 2. Audio Engine Enhancement
```typescript
// src/core/AudioManager.ts
export class AudioManager extends SoundManager {
  playTone(frequency: number, duration: number): void
  playSequence(tones: number[]): Promise<void>
  recordTiming(): number[]
}
```

#### 3. Scene/Object Generator
```typescript
// src/utils/SceneGenerator.ts
export class SceneGenerator {
  generateScene(objects: number, difficulty: number): Scene
  applyChange(scene: Scene, changeType: string): Scene
}
```

#### 4. Grid System Enhancement
```typescript
// src/components/GridSystem.ts
// Reusable grid for Memory Grid, Pattern Path, Mirror Match
export class GridSystem {
  render(size: number): void
  highlightCell(x: number, y: number): void
  getPath(): number[][]
}
```

---

## 📝 Game Development Template

For each new game, create:

### 1. Game File
```
src/games/[GameName]Game.ts
```

### 2. Game Styles
```
Inline styles in game class OR
src/styles/games/[gamename].css
```

### 3. Assets (if needed)
```
src/assets/[gamename]/
  - images/
  - sounds/
  - data.json
```

### 4. Tests (optional)
```
tests/games/[GameName]Game.test.ts
```

### 5. Documentation
Update:
- `README.md` - Add game to features list
- `PROJECT_STRUCTURE.md` - Document architecture
- This file - Mark as implemented

---

## 🎯 Implementation Status

### **Phase 4 - COMPLETE (Q4 2025)** ✅
1. ✅ Number Recall (easiest, high value)
2. ✅ Flash Count (quick, engaging)
3. ✅ Word Trail (PRD commitment)
4. ✅ Pattern Path (PRD commitment)

### **Phase 5 - COMPLETE (Q4 2025)** ✅
5. ✅ N-Back Challenge (scientific gold standard)
6. ✅ Story Recall (text-based, simple)
7. ✅ Change Detection (visual, engaging)
8. ✅ Color Sequence (variation)

### **Phase 6 - PLANNED (Q1 2026)** (4 games)
9. 📝 Shopping List (practical)
10. 📝 Mental Math Sprint (working memory)
11. 📝 Face Memory (requires asset system)
12. 📝 Route Planner (complex spatial)

### **Phase 7 - PLANNED (Q2 2026)** (3 games)
13. 📝 Sound Sequence (audio system needed)
14. 📝 Rhythm Recall (temporal)
15. 📝 Shape Rotation (3D/complex)

### **Future Phases** (1 game)
16. 📝 Mirror Match (spatial)

---

## 💡 Game Design Principles

When implementing any game, follow these guidelines:

### ✅ Must Have:
- **1-2 minute rounds** (quick sessions)
- **Clear instructions** (tutorial on first play)
- **Adaptive difficulty** (use DifficultyManager)
- **Immediate feedback** (visual/audio)
- **Progress tracking** (integrate with StorageManager)
- **Mobile-responsive** (touch-friendly)

### ✅ Should Have:
- **Visual polish** (smooth animations)
- **Sound effects** (optional but engaging)
- **Performance metrics** (accuracy, speed)
- **Encouraging messages** (positive reinforcement)

### ❌ Avoid:
- Rounds longer than 5 minutes
- Confusing instructions
- Static difficulty
- Cluttered UI
- Heavy asset loading

---

## 📚 Research References

### Scientific Backing:

**N-Back Training**:
- Jaeggi et al. (2008) - "Improving fluid intelligence with training on working memory"
- Buschkuehl et al. (2014) - "Neuronal effects of working memory training"

**Change Detection**:
- Luck & Vogel (1997) - "Visual working memory capacity"
- Rensink et al. (1997) - "Change blindness"

**Dual-Task Training**:
- Baddeley & Hitch (1974) - "Working memory model"
- Oberauer et al. (2016) - "Working memory capacity limits"

**Face Recognition**:
- McKone et al. (2012) - "Face recognition: neural and cognitive mechanisms"

---

## 🎨 UI/UX Considerations

### Game Selection Screen
- Organize by skill type or difficulty
- Show "New!" badge for recently added games
- Display personal best scores
- Lock/unlock mechanic (optional)

### In-Game UI
- Clear progress indicator (Round 2/5)
- Current score display
- Timer (when applicable)
- Pause button
- Exit button

### Results Screen
- Performance summary
- Comparison to previous attempts
- Next level preview
- "Play Again" and "Back to Menu" buttons

---

## 🔄 Update Schedule

This document should be updated:
- ✅ After each game implementation
- ✅ When priorities change
- ✅ When new games are proposed
- ✅ Quarterly review of roadmap

---

## 📧 Contribution Guidelines

When proposing new games:

1. **Cognitive Benefit**: What skill does it train?
2. **Uniqueness**: How is it different from existing games?
3. **Implementation**: Technical complexity estimate
4. **Research**: Any scientific backing?
5. **User Value**: Real-world application?

---

## ✅ Status Tracking

Update as games are implemented:

| Game | Status | Start Date | Complete Date | Developer |
|------|--------|-----------|---------------|-----------|
| **Phase 4 Games** |  |  |  |  |
| Number Recall | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Flash Count | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Word Trail | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Pattern Path | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| **Phase 5 Games** |  |  |  |  |
| N-Back Challenge | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Story Recall | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Change Detection | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| Color Sequence | ✅ Complete | Nov 2025 | Nov 2025 | Kyros Koh |
| **Future Games** |  |  |  |  |
| Shopping List | 📝 Planned | - | - | - |
| Mental Math | 📝 Planned | - | - | - |
| Face Memory | 📝 Planned | - | - | - |
| Sound Sequence | 📝 Planned | - | - | - |
| Rhythm Recall | 📝 Planned | - | - | - |
| Route Planner | 📝 Planned | - | - | - |
| Shape Rotation | 📝 Planned | - | - | - |
| Mirror Match | 📝 Planned | - | - | - |

**Legend**: 📝 Planned | 🚧 In Progress | ✅ Complete | ⏸️ On Hold | ❌ Cancelled

---

**Document maintained by**: Kyros Koh  
**Contact**: me@kyroskoh.com  
**GitHub**: [github.com/kyroskoh](https://github.com/kyroskoh)  
**Next Review Date**: Q1 2026  
**Questions/Suggestions**: Open an issue or submit a pull request at [github.com/kyroskoh/mnemoquest](https://github.com/kyroskoh/mnemoquest)

---

## 🎮 Total Game Count Projection

- **Phase 1-2** (Foundation): 3 games ✅
- **Phase 4** (Core Expansion): 7 games total (+4) ✅
- **Phase 5** (Advanced Training): 11 games total (+4) ✅ **← CURRENT**
- **Phase 6** (Planned): 15 games total (+4) 📝
- **Phase 7** (Planned): 18 games total (+3) 📝
- **Future Phases**: 19 games total (+1) 📝

**Current Status**: 11/19 games complete (58%)  
**Target**: 15-20 mini-games covering all major cognitive domains

---

*"The best memory training combines scientific rigor with engaging gameplay. Each game should be a tool for real cognitive improvement, not just entertainment."*

🧠 **Train Smart. Play Smart. Remember More.** 🎮

