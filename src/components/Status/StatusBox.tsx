import { FC } from 'react';

interface StatusBoxProps {
  title?:string;
  status?: 'success' | 'warning' | 'error' | string
}

const ColorsMapping = new Map<string,string> ([
    ['success', '#00c04b'],
    ['warning', '#efcc00'],
    ['error', '#ff6347']
])

const COLORSMAPPING = {
  SUCCESS: '#00c04b',
  WARNING: '#efcc00',
  ERROR: '#ff6347'
}

const StatusBox: FC<StatusBoxProps> = ({ title, status }) => {
    
    switch(status){
        case 'success': 
            return (
                <div className={`h-auto w-auto px-2 py-2 bg-[#00c04b] text-base text-white text-center`}>
                  {title}
                </div>
            );
        case 'warning': 
            return (
              <div className={`h-auto w-auto px-2 py-2 bg-[#efcc00] text-base text-white text-center`}>
              {title}
            </div>
            );
        case 'error':
          return (
            <div className={`h-auto w-auto px-2 py-2 bg-[#ff6347] text-base text-white text-center`}>
              {title}
            </div>
        );
        default:
          return (
            <div className={`h-full w-full px-2 py-2 bg-[#00c04b] text-base`}>
              {title}
            </div>
        );
           
    }

};

StatusBox.defaultProps = {
    title:
      'OK!',
    status:
      'success',
    
  };

export default StatusBox;
