$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = $('.wizard-step').length;
    const respuestas = {};
    
    // Función para actualizar la barra de progreso
    function updateProgress() {
        const progress = (currentStep / totalSteps) * 100;
        $('#progressBar').css('width', progress + '%').text(Math.round(progress) + '%');
        $('#stepCounter').text(currentStep);
    }
    
    // Función para mostrar un paso
    function showStep(step) {
        $('.wizard-step').hide();
        $(`.wizard-step[data-step="${step}"]`).show();
        
        // Actualizar botones
        $('#btnAnterior').prop('disabled', step === 1);
        if (step === totalSteps) {
            $('#btnSiguiente').hide();
            $('#btnFinalizar').show();
        } else {
            $('#btnSiguiente').show();
            $('#btnFinalizar').hide();
        }
        
        updateProgress();
    }
    
    // Función para validar paso actual
    function validateStep() {
        const currentStepElement = $(`.wizard-step[data-step="${currentStep}"]`);
        const selectedOption = currentStepElement.find('input[type="radio"]:checked');
        
        if (selectedOption.length === 0) {
            alert('Por favor seleccione una opción para continuar');
            return false;
        }
        
        // Guardar respuesta
        const questionName = selectedOption.attr('name');
        const questionId = questionName.replace('pregunta_', '');
        respuestas[questionId] = selectedOption.val();
        
        return true;
    }
    
    // Evento del botón Siguiente
    $('#btnSiguiente').click(function() {
        if (validateStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });
    
    // Evento del botón Anterior
    $('#btnAnterior').click(function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });
    
    // Evento del botón Finalizar
    $('#btnFinalizar').click(function() {
        if (validateStep()) {
            // Enviar respuestas al servidor
            $.ajax({
                url: 'procesar.php',
                method: 'POST',
                data: {
                    respuestas: respuestas,
                    action: 'procesar_diagnostico'
                },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        window.location.href = 'resultado.php?id=' + response.id_usuario;
                    } else {
                        alert('Error al procesar el diagnóstico: ' + response.message);
                    }
                },
                error: function() {
                    alert('Error de conexión. Por favor intente nuevamente.');
                }
            });
        }
    });
    
    // Inicializar
    showStep(1);
});