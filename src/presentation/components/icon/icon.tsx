import Styles from './icon-styles.scss'
import React from 'react'

export enum IconName {
  Up = 'https://i.postimg.cc/HxFztSLB/icon.png'
}

type Props = {
  iconName: IconName
  className?: string
}

const Icon: React.FC<Props> = ({ iconName, className }: Props) => {
  const iconColor = iconName === IconName.Up ? Styles.up : Styles.red
  return (
    <div className={[Styles.iconWrap, iconColor, className].join(' ')}>
      <img data-testid="icon" className={Styles.icon} src={iconName} />
    </div>
  )
}

export default Icon
