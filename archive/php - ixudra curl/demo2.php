<?php

    private function callApi($url: string, $params: array)
    {
		// \Ixudra\Curl\Facades\Curl
        $request = Curl::to($url)
				//->withOption('TIMEOUT', 60 * 10)
				//->withOption('CONNECTTIMEOUT', 0)
				//->withOption('SSL_VERIFYPEER', 0)
				//->withOption('FOLLOWLOCATION', true)
				
				//->withHeader('token: c4Mi6k-sYPTmnZcxZAaRUtmf0kWgRrRnLMnZUMqRLixpBilMCQJV27hxxS6ikn-5')
				
                //->withHeader('Content-Type: application/json')
                //->withContentType('application/json')
				//->withData(json_encode($params))
			
                ->withData($params)
				->asJsonRequest()
                
                ->returnResponseObject();

        $response = $request->post();
		//Log::info('ttcdLogin ' . $response->status . ', ' . $response->content);

        if ($response->status < 300) {
            return $response->content;
			
			/*
			$result = json_decode($response->content);
            if ($result->code == 0) {
                $token = $result->data;
                return $token;
            } else {
                return '';
            }
			*/
        } else {
            Log::error('Co loi khi goi API Reputa ' . $response->status . ', ' . $response->content);
            return '';
        }
    }
