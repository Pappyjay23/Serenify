import BetterSleepImg from "@/assets/images/better-sleep.png";
import ImprovePerformanceImg from "@/assets/images/improve-performance.png";
import IncreaseHappiness from "@/assets/images/increase-happiness.png";
import PersonalGrowthImg from "@/assets/images/personal-growth.png";
import ReduceAnxietyImg from "@/assets/images/reduce-anxiety.png";
import ReduceStressImg from "@/assets/images/reduce-stress.png";

import ReduceStressAudio from '@/assets/audio/reduce-stress.mp3';
import ImprovePerformanceAudio from '@/assets/audio/improve-performance.mp3';
import ReduceAnxietyAudio from '@/assets/audio/reduce-anxiety.mp3';
import BetterSleepAudio from '@/assets/audio/better-sleep.mp3';
import PersonalGrowthAudio from '@/assets/audio/personal-growth.mp3';
import IncreaseHappinessAudio from '@/assets/audio/increase-happiness.mp3'; 

export const meditateCategory = [
    {
        id: 1,
        name: "Reduce Stress",
        image: ReduceStressImg,
        colorTheme: "#808AFF",
        audio: ReduceStressAudio
    },
    {
        id: 2,
        name: "Improve Performance",
        image: ImprovePerformanceImg,
        colorTheme: "#F05D48",
        audio: ImprovePerformanceAudio
    },
    {
        id: 3,
        name: "Reduce Anxiety",
        image: ReduceAnxietyImg,
        colorTheme: "#FFCF86",
        audio: ReduceAnxietyAudio
    },
    {
        id: 4,
        name: "Better Sleep",
        image: BetterSleepImg,
        colorTheme: "#4E5567",
        audio: BetterSleepAudio
    },
    {
        id: 5,
        name: "Personal Growth",
        image: PersonalGrowthImg,
        colorTheme: "#6CB28E",
        audio: PersonalGrowthAudio
    },
    {
        id: 6,
        name: "Increase Happiness",
        image: IncreaseHappiness,
        colorTheme: "#b5baf4",
        audio: IncreaseHappinessAudio
    },
];