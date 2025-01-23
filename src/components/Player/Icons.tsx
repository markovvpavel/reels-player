import {
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";

type IconProps = { children: React.ReactNode; className?: string };

const Icon = ({ children, className }: IconProps) => {
  return <div className={`${className} text-zinc-100`}>{children}</div>;
};

type SpecIconProps = Pick<IconProps, "className">;

export const Mute = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <SpeakerWaveIcon />
  </Icon>
);

export const Unmute = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <SpeakerXMarkIcon />
  </Icon>
);

export const Play = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <PlayIcon />
  </Icon>
);

export const Pause = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <PauseIcon />
  </Icon>
);

export const Backward = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <BackwardIcon />
  </Icon>
);

export const Forward = ({ className }: SpecIconProps) => (
  <Icon className={className}>
    <ForwardIcon />
  </Icon>
);
