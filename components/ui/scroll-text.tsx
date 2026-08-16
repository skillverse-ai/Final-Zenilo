// @ts-nocheck

'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, motion } from 'motion/react';
import type React from 'react';
import type { JSX } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const generateVariants = (direction: Direction): { hidden: any; visible: any } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'up' ? 20 : -20;

  return {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      [axis]: value,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px 0px 0px' };

const TextAnimation = ({
  as = 'h1',
  text,
  classname = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = true,
}: {
  text: string;
  classname?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: {
    hidden?: any;
    visible?: any;
  };
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
}) => {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<
    HTMLMotionProps<any>
  >;

  return (
    <MotionComponent
      whileInView='visible'
      initial='hidden'
      variants={containerVariants}
      viewport={viewport}
      className={cn(`inline-block text-foreground`, classname)}
    >
      {lineAnime ? (
        <motion.span className={`inline-block`} variants={modifiedVariants} style={{ willChange: "filter, transform, opacity" }}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word: string, index: number) => (
            <motion.span
              key={`${word}-${index}`}
              className={`inline-block`}
              variants={letterAnime === false ? modifiedVariants : {}}
              style={{ willChange: "filter, transform, opacity" }}
            >
              {letterAnime ? (
                <>
                  {word.split('').map((letter: string, letterIndex: number) => (
                    <motion.span
                      key={letterIndex}
                      className={`inline-block`}
                      variants={modifiedVariants}
                      style={{ willChange: "filter, transform, opacity" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  );
};

export default TextAnimation;
