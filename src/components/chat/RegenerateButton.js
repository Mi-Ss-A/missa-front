// components/chat/RegenerateButton.js
import Button from '../ui/Button';

const RegenerateButton = ({ onRegenerate }) => (
    <div className="flex justify-center my-4">
        <Button onClick={onRegenerate} className="px-4 py-2">
            Regenerate Response
        </Button>
    </div>
);

export default RegenerateButton;
